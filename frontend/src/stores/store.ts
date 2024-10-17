import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import achievementsSlice from './achievements/achievementsSlice';
import collaborationsSlice from './collaborations/collaborationsSlice';
import resourcesSlice from './resources/resourcesSlice';
import student_profilesSlice from './student_profiles/student_profilesSlice';
import study_plansSlice from './study_plans/study_plansSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import organizationsSlice from './organizations/organizationsSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    achievements: achievementsSlice,
    collaborations: collaborationsSlice,
    resources: resourcesSlice,
    student_profiles: student_profilesSlice,
    study_plans: study_plansSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    organizations: organizationsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
