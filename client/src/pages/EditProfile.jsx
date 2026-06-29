import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Image,
  Save,
  ArrowLeft,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import TagInput from "../components/TagInput";

import {
  skillSuggestions,
  interestSuggestions,
  hobbySuggestions,
} from "../utils/recommendations";

const EditProfile = () => {
  const { user, fetchProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [location, setLocation] = useState(user?.location || "");
  const [profileImage, setProfileImage] = useState(
    user?.profileImage || ""
  );

  const [skills, setSkills] = useState(user?.skills || []);
  const [interests, setInterests] = useState(
    user?.interests || []
  );
  const [hobbies, setHobbies] = useState(
    user?.hobbies || []
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put("/auth/profile", {
        name,
        email,
        location,
        profileImage,
        skills,
        interests,
        hobbies,
      });

      await fetchProfile();

      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Unable to update profile.");
    } finally {
      setLoading(false);
    }
  };
  return (

<div className="min-h-screen bg-slate-950 py-14 px-6">

<div className="mx-auto max-w-6xl">

<button
onClick={() => navigate("/profile")}
className="mb-8 flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-slate-300 hover:bg-slate-800 transition"
>

<ArrowLeft size={18}/>

Back to Profile

</button>

<motion.div

initial={{opacity:0,y:30}}

animate={{opacity:1,y:0}}

className="grid lg:grid-cols-3 gap-10"

>

{/* LEFT PANEL */}

<div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">

<img

src={
profileImage ||
`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563EB&color=fff&size=256`
}

alt={name}

className="mx-auto h-40 w-40 rounded-full border-4 border-blue-500 object-cover shadow-xl"

/>

<h2 className="mt-6 text-3xl font-bold text-white">

{name || "Campus Member"}

</h2>

<p className="mt-2 text-slate-400">

{email}

</p>

<div className="mt-8 space-y-4 text-left">

<div className="flex items-center gap-3 text-slate-300">

<User size={18}/>

{name}

</div>

<div className="flex items-center gap-3 text-slate-300">

<Mail size={18}/>

{email}

</div>

<div className="flex items-center gap-3 text-slate-300">

<MapPin size={18}/>

{location || "Location not added"}

</div>

</div>

</div>

{/* RIGHT PANEL */}

<div className="lg:col-span-2 rounded-3xl border border-slate-800 bg-slate-900 p-10">

<h1 className="mb-8 text-4xl font-bold text-white">

Edit Profile

</h1>

<form className="space-y-6" onSubmit={handleSubmit}>

<div>

<label className="mb-2 block text-slate-300">

Full Name

</label>

<div className="relative">

<User size={18} className="absolute left-4 top-4 text-slate-500"/>

<input

value={name}

onChange={(e)=>setName(e.target.value)}

className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none focus:border-blue-500"

/>

</div>

</div>

<div>

<label className="mb-2 block text-slate-300">

Email

</label>

<div className="relative">

<Mail size={18} className="absolute left-4 top-4 text-slate-500"/>

<input

type="email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none focus:border-blue-500"

/>

</div>

</div>

<div>

<label className="mb-2 block text-slate-300">

Location

</label>

<div className="relative">

<MapPin size={18} className="absolute left-4 top-4 text-slate-500"/>

<input

value={location}

onChange={(e)=>setLocation(e.target.value)}

className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none focus:border-blue-500"

/>

</div>

</div>

<div>

<label className="mb-2 block text-slate-300">

Profile Image URL

</label>

<div className="relative">

<Image size={18} className="absolute left-4 top-4 text-slate-500"/>

<input

value={profileImage}

onChange={(e)=>setProfileImage(e.target.value)}

className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none focus:border-blue-500"

/>

</div>

</div>
          <div className="pt-4">
            <TagInput
              label="Skills"
              placeholder="Search Skills..."
              suggestions={skillSuggestions}
              value={skills}
              onChange={setSkills}
            />
          </div>

          <div className="pt-2">
            <TagInput
              label="Interests"
              placeholder="Search Interests..."
              suggestions={interestSuggestions}
              value={interests}
              onChange={setInterests}
            />
          </div>

          <div className="pt-2">
            <TagInput
              label="Hobbies"
              placeholder="Search Hobbies..."
              suggestions={hobbySuggestions}
              value={hobbies}
              onChange={setHobbies}
            />
          </div>

          <div className="flex gap-4 pt-8">

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="flex-1 rounded-xl border border-slate-700 py-3 font-semibold text-slate-300 transition hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={20} />

              {loading ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </motion.div>

  </div>

</div>

);
};

export default EditProfile;