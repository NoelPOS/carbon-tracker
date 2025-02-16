import { useState, useEffect } from "react";
import axios from "axios";

// -- Badge Table
// CREATE TABLE Badge (
//     badge_id SERIAL PRIMARY KEY,
//     badge_url VARCHAR(255),
//     badge_desc TEXT,
//     admin_id INT REFERENCES Admin(admin_id) ON DELETE CASCADE ON UPDATE CASCADE
// );

// -- Reward Table (Links Badges to Users)
// CREATE TABLE Reward (
//     badge_id INT REFERENCES Badge(badge_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     user_id INT REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     PRIMARY KEY (badge_id, user_id)
// );

// -- Users Table
// CREATE TABLE Users (
//     user_id SERIAL PRIMARY KEY,
//     fullname VARCHAR(255) NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     address VARCHAR(255),
//     phone_number VARCHAR(20),
//     status VARCHAR(10) CHECK (status IN ('active', 'suspended')) DEFAULT 'active',
//     streak_day INT DEFAULT 0,
//     last_survey DATE
// );

export default function Profile() {
  const [profileData, setProfileData] = useState({
    user_id: "",
    fullname: "",
    email: "",
    password: "",
    phone_number: "",
    address: "",
    accountCreated: "",
  });
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("users")).user_id;
    console.log("User:", userId);

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/profile/${userId}`
        );
        console.log("Profile:", res.data);
        setProfileData(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();

    const fetchBadges = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/badge/${userId}`
        );
        console.log("Badges:", res.data);
        setBadges(res.data);
      } catch (err) {
        console.error("Error fetching badges:", err);
      }
    };
    fetchBadges();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/api/users/update/${profileData.user_id}`,
        profileData
      );
      localStorage.setItem("users", JSON.stringify(res.data));
      alert("Profile updated successfully");
      window.location.reload();
    } catch {
      console.log("Error updating profile");
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Information */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Profile Information</h2>
          <div className="mt-4 flex items-center space-x-6">
            <img
              src={`https://avatar.iran.liara.run/username?username=${profileData.fullname}`}
              alt="Profile"
              className="h-25 w-25 rounded-lg object-cover"
            />
            <div className="flex-1 space-y-6">
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  value={profileData.fullname}
                  onChange={(e) =>
                    setProfileData({ ...profileData, fullname: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  value={profileData.password}
                  onChange={(e) =>
                    setProfileData({ ...profileData, password: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Additional Information</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                value={profileData.phone_number}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    phone_number: e.target.value,
                  })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                value={profileData.address}
                onChange={(e) =>
                  setProfileData({ ...profileData, address: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>

      {/* Badges */}
      <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Your Achievement Badges</h2>
        <div className="mt-6">
          {badges.length === 0 ? (
            <div className="col-span-3 text-center py-8">
              <div className="text-gray-400 text-5xl mb-4">🏅</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Badges Earned Yet
              </h3>
              <p className="text-gray-500">
                Complete surveys and reduce your carbon footprint to earn
                badges!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {badges.map((badge) => (
                <div
                  key={badge.badge_id}
                  className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-b from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="w-24 h-24 rounded-full flex items-center justify-center bg-white shadow-inner p-4 mb-4">
                    <img
                      src={badge.badge_url}
                      alt={badge.badge_desc}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-center font-medium text-gray-800 mb-2">
                    {badge.badge_desc}
                  </h3>
                  <span className="text-sm text-gray-500">
                    Earned on {new Date(badge.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
