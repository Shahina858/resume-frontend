export const getSkillGap = async (userSkills, role) => {
  const roleSkills = {
    "Frontend Developer": ["React", "TypeScript", "CSS", "Git", "Tailwind"],
    "Backend Developer": ["Node.js", "Express", "MongoDB", "SQL", "Redis"],
    "Full Stack Developer": ["React", "Node.js", "Express", "MongoDB", "Git"]
  };

  const coursesMap = {
    TypeScript: "Udemy TypeScript Bootcamp",
    Git: "Coursera Git Essentials",
    React: "Scrimba Advanced React",
    "Node.js": "Node.js Design Patterns",
    MongoDB: "MongoDB University Basics",
    Tailwind: "Tailwind CSS Tutorial",
    Express: "Express.js Path on Pluralsight"
  };

  const required = roleSkills[role] || [];
  const missingSkills = required.filter(
    s => !userSkills.map(us => us.toLowerCase()).includes(s.toLowerCase())
  );

  const courses = missingSkills.map(s => ({
    skill: s,
    course: coursesMap[s] || "Check online documentation for " + s,
  }));

  return { missingSkills, courses };
};
