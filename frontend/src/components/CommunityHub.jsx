import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const API_BASE = "http://localhost:5000/api";

export default function CommunityHub() {
  const [posts, setPosts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState("");

  // Modal states
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [brandModalOpen, setBrandModalOpen] = useState(false);

  // Form states
  const [newPost, setNewPost] = useState({ title: "", description: "" });
  const [newBrand, setNewBrand] = useState({ name: "", description: "", website: "" });

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchPosts();
    fetchBrands();
    fetchChallenges();
  }, []);

  // Fetch functions
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_BASE}/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError("Failed to fetch posts");
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${API_BASE}/brands`);
      const data = await response.json();
      setBrands(data);
    } catch (err) {
      setError("Failed to fetch brands");
    }
  };

  const fetchChallenges = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/challenges", {
        headers: {
          "x-auth-token": token
        }
      });
      const data = await response.json();
      setChallenges(data);
    } catch (err) {
      setError("Failed to fetch challenges");
    }
  };

  // Submit handlers
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(newPost)
      });

      if (!response.ok) throw new Error("Failed to create post");

      const data = await response.json();
      setPosts([data, ...posts]);
      setNewPost({ title: "", description: "" });
      setPostModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/brands`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(newBrand)
      });

      if (!response.ok) throw new Error("Failed to create brand");

      const data = await response.json();
      setBrands([data, ...brands]);
      setNewBrand({ name: "", description: "", website: "" });
      setBrandModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCompleteChallenge = async (challengeId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to complete challenges");
        return;
      }

      const response = await fetch("http://localhost:5000/api/challenges/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token
        },
        body: JSON.stringify({ challengeId })
      });

      if (!response.ok) {
        throw new Error("Failed to complete challenge");
      }

      const data = await response.json();

      // Update user's score in localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        user.sustain_score = data.newScore;
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Update challenges list to show completion
      setChallenges(challenges.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, completed: true }
          : challenge
      ));

    } catch (err) {
      console.error("Complete challenge error:", err);
      setError("Failed to complete challenge. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 mt-28">
      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <Dialog open={postModalOpen} onOpenChange={setPostModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <Input
                placeholder="Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                required
              />
              <Textarea
                placeholder="What's on your mind?"
                value={newPost.description}
                onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                required
              />
              <Button type="submit">Post</Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={brandModalOpen} onOpenChange={setBrandModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Brand
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Responsible Brand</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleBrandSubmit} className="space-y-4">
              <Input
                placeholder="Brand Name"
                value={newBrand.name}
                onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                required
              />
              <Textarea
                placeholder="Brand Description"
                value={newBrand.description}
                onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
                required
              />
              <Input
                placeholder="Website URL"
                type="url"
                value={newBrand.website}
                onChange={(e) => setNewBrand({ ...newBrand, website: e.target.value })}
              />
              <Button type="submit">Add Brand</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Challenges Section */}
      <div className="mb-8 bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-secondary border-l-4 border-emerald-400 pl-2 mb-4">
          Eco Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="h-[300px] flex flex-col">
              <CardHeader className="flex-none">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  </div>
                  {currentUser && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCompleteChallenge(challenge.id)}
                      disabled={challenge.completed}
                      className={`${
                        challenge.completed
                          ? "bg-green-100 text-green-700"
                          : "text-green-600 hover:text-green-700"
                      }`}
                    >
                      {challenge.completed 
                        ? "Completed!" 
                        : "Mark Complete (+10 pts)"}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto">
                <p className="text-sm mb-2">{challenge.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-secondary border-l-4 border-emerald-400 pl-2 mb-4">
          Top Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto p-4 bg-white rounded-xl shadow-md p-6 mb-8 ">
          {posts.map((post) => (
            <Card key={post.id} className="h-[200px] flex flex-col">
              <CardHeader className="flex-none">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Posted by {post.username} • {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {currentUser && currentUser.id === post.user_id && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(post.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto">
                <p className="text-sm">{post.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-secondary border-l-4 border-emerald-400 pl-2 mb-4">
          Discover Responsible Brands
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all hover:-translate-y-1">
              <strong className="block mb-2">{brand.name}</strong>
              <p className="text-gray-600 mb-2">{brand.description}</p>
              {brand.website && (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:underline font-semibold">
                  Visit
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
