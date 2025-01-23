import { useState, useEffect } from "react";

const POSTS_API = "http://localhost:5000/api/posts";
const BRANDS_API = "http://localhost:5000/api/brands";
const CHALLENGES_API = "http://localhost:5000/api/challenges";

export default function CommunityHub() {
  const [posts, setPosts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });

  useEffect(() => {
    loadPosts();
    loadBrands();
    loadChallenges();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(POSTS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Post added successfully!");
        setFormData({ title: "", description: "" });
        loadPosts();
      } else {
        throw new Error("Failed to add post");
      }
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  const loadPosts = async () => {
    try {
      const response = await fetch(POSTS_API);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error loading posts: ", error);
    }
  };

  const loadBrands = async () => {
    try {
      const response = await fetch(BRANDS_API);
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error("Error loading brands: ", error);
    }
  };

  const loadChallenges = async () => {
    try {
      const response = await fetch(CHALLENGES_API);
      const data = await response.json();
      setChallenges(data);
    } catch (error) {
      console.error("Error loading challenges: ", error);
    }
  };

  const markChallengeCompleted = async (id) => {
    try {
      const response = await fetch(`${CHALLENGES_API}/${id}`, {
        method: "PUT",
      });
      const data = await response.json();
      alert(data.message);
      loadChallenges();
    } catch (error) {
      console.error("Error marking challenge as completed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background mt-32 p-3">
      <h1 className="text-4xl font-bold text-center">
        Community & Awareness Hub
      </h1>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Post Form */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-secondary border-l-4 border-emerald-400 pl-2 mb-4">
            Share a Tip
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Title"
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary"
              required
            />
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Share your tip..."
              className="w-full p-3 border border-gray-200 rounded-lg h-32 focus:border-secondary focus:ring-1 focus:ring-secondary"
              required
            />
            <button
              type="submit"
              className="w-1/2 mx-auto block bg-secondary text-white py-3 px-6 rounded-lg font-bold hover:bg-emerald-600 transform hover:scale-105 transition-all">
              Post
            </button>
          </form>
        </section>

        {/* Posts */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-secondary border-l-4 border-emerald-400 pl-2 mb-4">
            Community Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-2">{post.description}</p>
                <small className="text-gray-500">
                  Posted on {new Date(post.created_at).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        </section>

        {/* Brands */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-secondary border-l-4 border-emerald-400 pl-2 mb-4">
            Discover Responsible Brands
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all hover:-translate-y-1">
                <strong className="block mb-2">{brand.name}</strong>
                <p className="text-gray-600 mb-2">{brand.description}</p>
                {brand.link ? (
                  <a
                    href={brand.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:underline font-semibold">
                    Visit
                  </a>
                ) : (
                  <span className="text-gray-500">No Website</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-secondary border-l-4 border-emerald-400 pl-2 mb-4">
            Eco-Friendly Challenges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all hover:-translate-y-1">
                <strong className="block mb-2">{challenge.title}</strong>
                <p className="text-gray-600 mb-4">{challenge.description}</p>
                <button
                  onClick={() => markChallengeCompleted(challenge.id)}
                  disabled={challenge.completed}
                  className={`w-full py-2 px-4 rounded-lg font-bold transition-all ${
                    challenge.completed
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-secondary text-white hover:bg-emerald-600 hover:scale-105"
                  }`}>
                  {challenge.completed ? "Completed" : "Mark as Completed"}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
