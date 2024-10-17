const db = require('../models');
const Users = db.users;

const Achievements = db.achievements;

const Collaborations = db.collaborations;

const Resources = db.resources;

const StudentProfiles = db.student_profiles;

const StudyPlans = db.study_plans;

const Organizations = db.organizations;

const AchievementsData = [
  {
    // type code here for "relation_one" field

    achievement_name: 'Math Whiz',

    date_earned: new Date('2023-10-11T08:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    achievement_name: 'Science Explorer',

    date_earned: new Date('2023-09-21T08:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    achievement_name: 'Creative Genius',

    date_earned: new Date('2023-10-13T08:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    achievement_name: 'History Buff',

    date_earned: new Date('2023-10-01T08:00:00Z'),

    // type code here for "relation_one" field
  },
];

const CollaborationsData = [
  {
    // type code here for "relation_many" field

    topic: 'Math Study Group',

    start_time: new Date('2023-10-15T10:00:00Z'),

    end_time: new Date('2023-10-15T12:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_many" field

    topic: 'Art and History Discussion',

    start_time: new Date('2023-10-16T14:00:00Z'),

    end_time: new Date('2023-10-16T16:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_many" field

    topic: 'Tech and Science Workshop',

    start_time: new Date('2023-10-17T09:00:00Z'),

    end_time: new Date('2023-10-17T11:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_many" field

    topic: 'Creative Writing Session',

    start_time: new Date('2023-10-18T13:00:00Z'),

    end_time: new Date('2023-10-18T15:00:00Z'),

    // type code here for "relation_one" field
  },
];

const ResourcesData = [
  {
    title: 'Introduction to Algebra',

    type: 'article',

    url: 'https://example.com/algebra-video',

    // type code here for "relation_one" field
  },

  {
    title: 'World War II Overview',

    type: 'quiz',

    url: 'https://example.com/ww2-article',

    // type code here for "relation_one" field
  },

  {
    title: 'Basic Chemistry Quiz',

    type: 'video',

    url: 'https://example.com/chemistry-quiz',

    // type code here for "relation_one" field
  },

  {
    title: 'Creative Writing Techniques',

    type: 'article',

    url: 'https://example.com/writing-video',

    // type code here for "relation_one" field
  },
];

const StudentProfilesData = [
  {
    // type code here for "relation_one" field

    strengths: 'Mathematics, Analytical Thinking',

    weaknesses: 'History, Memorization',

    learning_preferences: 'Visual, Interactive',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    strengths: 'Science, Problem Solving',

    weaknesses: 'Literature, Writing',

    learning_preferences: 'Auditory, Hands-on',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    strengths: 'Art, Creativity',

    weaknesses: 'Math, Logic',

    learning_preferences: 'Visual, Collaborative',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    strengths: 'History, Storytelling',

    weaknesses: 'Science, Experiments',

    learning_preferences: 'Reading, Discussion',

    // type code here for "relation_one" field
  },
];

const StudyPlansData = [
  {
    // type code here for "relation_one" field

    created_date: new Date('2023-10-01T08:00:00Z'),

    last_updated: new Date('2023-10-10T08:00:00Z'),

    plan_details: 'Focus on visual learning resources for mathematics.',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    created_date: new Date('2023-09-15T08:00:00Z'),

    last_updated: new Date('2023-09-20T08:00:00Z'),

    plan_details: 'Incorporate auditory resources for science topics.',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    created_date: new Date('2023-10-05T08:00:00Z'),

    last_updated: new Date('2023-10-12T08:00:00Z'),

    plan_details: 'Use collaborative tools for art projects.',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    created_date: new Date('2023-09-25T08:00:00Z'),

    last_updated: new Date('2023-09-30T08:00:00Z'),

    plan_details: 'Focus on reading materials for history lessons.',

    // type code here for "relation_one" field
  },
];

const OrganizationsData = [
  {
    name: 'Jean Baptiste Lamarck',
  },

  {
    name: 'Frederick Gowland Hopkins',
  },

  {
    name: 'Nicolaus Copernicus',
  },

  {
    name: 'Rudolf Virchow',
  },
];

// Similar logic for "relation_many"

async function associateUserWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setOrganization) {
    await User0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setOrganization) {
    await User1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setOrganization) {
    await User2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setOrganization) {
    await User3.setOrganization(relatedOrganization3);
  }
}

async function associateAchievementWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Achievement0 = await Achievements.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Achievement0?.setUser) {
    await Achievement0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Achievement1 = await Achievements.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Achievement1?.setUser) {
    await Achievement1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Achievement2 = await Achievements.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Achievement2?.setUser) {
    await Achievement2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Achievement3 = await Achievements.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Achievement3?.setUser) {
    await Achievement3.setUser(relatedUser3);
  }
}

async function associateAchievementWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Achievement0 = await Achievements.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Achievement0?.setOrganization) {
    await Achievement0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Achievement1 = await Achievements.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Achievement1?.setOrganization) {
    await Achievement1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Achievement2 = await Achievements.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Achievement2?.setOrganization) {
    await Achievement2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Achievement3 = await Achievements.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Achievement3?.setOrganization) {
    await Achievement3.setOrganization(relatedOrganization3);
  }
}

// Similar logic for "relation_many"

async function associateCollaborationWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Collaboration0 = await Collaborations.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Collaboration0?.setOrganization) {
    await Collaboration0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Collaboration1 = await Collaborations.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Collaboration1?.setOrganization) {
    await Collaboration1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Collaboration2 = await Collaborations.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Collaboration2?.setOrganization) {
    await Collaboration2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Collaboration3 = await Collaborations.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Collaboration3?.setOrganization) {
    await Collaboration3.setOrganization(relatedOrganization3);
  }
}

async function associateResourceWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Resource0 = await Resources.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Resource0?.setOrganization) {
    await Resource0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Resource1 = await Resources.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Resource1?.setOrganization) {
    await Resource1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Resource2 = await Resources.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Resource2?.setOrganization) {
    await Resource2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Resource3 = await Resources.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Resource3?.setOrganization) {
    await Resource3.setOrganization(relatedOrganization3);
  }
}

async function associateStudentProfileWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const StudentProfile0 = await StudentProfiles.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (StudentProfile0?.setUser) {
    await StudentProfile0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const StudentProfile1 = await StudentProfiles.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (StudentProfile1?.setUser) {
    await StudentProfile1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const StudentProfile2 = await StudentProfiles.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (StudentProfile2?.setUser) {
    await StudentProfile2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const StudentProfile3 = await StudentProfiles.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (StudentProfile3?.setUser) {
    await StudentProfile3.setUser(relatedUser3);
  }
}

async function associateStudentProfileWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const StudentProfile0 = await StudentProfiles.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (StudentProfile0?.setOrganization) {
    await StudentProfile0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const StudentProfile1 = await StudentProfiles.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (StudentProfile1?.setOrganization) {
    await StudentProfile1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const StudentProfile2 = await StudentProfiles.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (StudentProfile2?.setOrganization) {
    await StudentProfile2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const StudentProfile3 = await StudentProfiles.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (StudentProfile3?.setOrganization) {
    await StudentProfile3.setOrganization(relatedOrganization3);
  }
}

async function associateStudyPlanWithStudent_profile() {
  const relatedStudent_profile0 = await StudentProfiles.findOne({
    offset: Math.floor(Math.random() * (await StudentProfiles.count())),
  });
  const StudyPlan0 = await StudyPlans.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (StudyPlan0?.setStudent_profile) {
    await StudyPlan0.setStudent_profile(relatedStudent_profile0);
  }

  const relatedStudent_profile1 = await StudentProfiles.findOne({
    offset: Math.floor(Math.random() * (await StudentProfiles.count())),
  });
  const StudyPlan1 = await StudyPlans.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (StudyPlan1?.setStudent_profile) {
    await StudyPlan1.setStudent_profile(relatedStudent_profile1);
  }

  const relatedStudent_profile2 = await StudentProfiles.findOne({
    offset: Math.floor(Math.random() * (await StudentProfiles.count())),
  });
  const StudyPlan2 = await StudyPlans.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (StudyPlan2?.setStudent_profile) {
    await StudyPlan2.setStudent_profile(relatedStudent_profile2);
  }

  const relatedStudent_profile3 = await StudentProfiles.findOne({
    offset: Math.floor(Math.random() * (await StudentProfiles.count())),
  });
  const StudyPlan3 = await StudyPlans.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (StudyPlan3?.setStudent_profile) {
    await StudyPlan3.setStudent_profile(relatedStudent_profile3);
  }
}

async function associateStudyPlanWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const StudyPlan0 = await StudyPlans.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (StudyPlan0?.setOrganization) {
    await StudyPlan0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const StudyPlan1 = await StudyPlans.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (StudyPlan1?.setOrganization) {
    await StudyPlan1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const StudyPlan2 = await StudyPlans.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (StudyPlan2?.setOrganization) {
    await StudyPlan2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const StudyPlan3 = await StudyPlans.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (StudyPlan3?.setOrganization) {
    await StudyPlan3.setOrganization(relatedOrganization3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Achievements.bulkCreate(AchievementsData);

    await Collaborations.bulkCreate(CollaborationsData);

    await Resources.bulkCreate(ResourcesData);

    await StudentProfiles.bulkCreate(StudentProfilesData);

    await StudyPlans.bulkCreate(StudyPlansData);

    await Organizations.bulkCreate(OrganizationsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithOrganization(),

      await associateAchievementWithUser(),

      await associateAchievementWithOrganization(),

      // Similar logic for "relation_many"

      await associateCollaborationWithOrganization(),

      await associateResourceWithOrganization(),

      await associateStudentProfileWithUser(),

      await associateStudentProfileWithOrganization(),

      await associateStudyPlanWithStudent_profile(),

      await associateStudyPlanWithOrganization(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('achievements', null, {});

    await queryInterface.bulkDelete('collaborations', null, {});

    await queryInterface.bulkDelete('resources', null, {});

    await queryInterface.bulkDelete('student_profiles', null, {});

    await queryInterface.bulkDelete('study_plans', null, {});

    await queryInterface.bulkDelete('organizations', null, {});
  },
};
