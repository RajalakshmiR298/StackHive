const matchProfiles = (currentUser, otherUsers) => {
  return otherUsers
    .map((user) => {
      let score = 0;
      let total = 0;

      // Skills
      const currentSkills = currentUser.skills || [];
      const otherSkills = user.skills || [];

      total += currentSkills.length;

      currentSkills.forEach((skill) => {
        if (otherSkills.includes(skill)) {
          score++;
        }
      });

      // Interests
      const currentInterests = currentUser.interests || [];
      const otherInterests = user.interests || [];

      total += currentInterests.length;

      currentInterests.forEach((interest) => {
        if (otherInterests.includes(interest)) {
          score++;
        }
      });

      // Hobbies
      const currentHobbies = currentUser.hobbies || [];
      const otherHobbies = user.hobbies || [];

      total += currentHobbies.length;

      currentHobbies.forEach((hobby) => {
        if (otherHobbies.includes(hobby)) {
          score++;
        }
      });

      const matchPercentage =
        total === 0 ? 0 : Math.round((score / total) * 100);

      return {
        ...user.toObject(),
        matchPercentage,
      };
    })
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
};

module.exports = {
  matchProfiles,
};