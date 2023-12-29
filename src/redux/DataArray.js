import { createSlice } from '@reduxjs/toolkit';

export const DataArraySlice = createSlice({
  name: 'dataArray',
  initialState: {
    student: '',
    instructor: '',
    difficulty: '',
    WeatherConditions: {
      weather: '',
      temperature: 0,
      windSpeed: 0,
      windDirection: 0,
    },
    parameters: {
      mapArea: 50,
      exerciseTime: '',
      terrain: '',
    },
    initialAmmo: {
      apfsds: 0,
      he: 0,
      heat: 0,
      mg762: 0,
    },
    mapData: {
      totalOwnTanks: 0,
      totalEnemies: 0,
      totalEnemyTanks: 0,
      totalEnemyAPCs: 0,
      ownTanks: [],
      enemies: [],
      forrestAndBuildings: [],
    },
  },
  reducers: {
    setStudent: (state, action) => {
      state.student = action.payload;
    },
    setInstructor: (state, action) => {
      state.instructor = action.payload;
    },
    setWeather: (state, action) => {
      state.WeatherConditions.weather = action.payload;
    },
    setTemperature: (state, action) => {
      state.WeatherConditions.temperature = action.payload;
    },
    setWindSpeed: (state, action) => {
      state.WeatherConditions.windSpeed = action.payload;
    },
    setWindDirection: (state, action) => {
      state.WeatherConditions.windDirection = action.payload;
    },
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    setMapArea: (state, action) => {
      state.parameters.mapArea = action.payload;
    },
    setExerciseTime: (state, action) => {
      state.parameters.exerciseTime = action.payload;
    },
    setTerrain: (state, action) => {
      state.parameters.terrain = action.payload;
    },
    setApfsds: (state, action) => {
      state.initialAmmo.apfsds = action.payload;
    },
    setHe: (state, action) => {
      state.initialAmmo.he = action.payload;
    },
    setHeat: (state, action) => {
      state.initialAmmo.heat = action.payload;
    },
    setMg762: (state, action) => {
      state.initialAmmo.mg762 = action.payload;
    },
    addEnemy: (state, action) => {
      const { enemyName, details, path, unitId } = action.payload;
      let existingEnemy = state.mapData.enemies.find(
        (e) => e.name === enemyName,
      );
      if (!existingEnemy) {
        existingEnemy = {
          name: enemyName,
          details: details || {},
          paths: {},
        };
        state.mapData.enemies.push(existingEnemy);
      }
      existingEnemy.details = details || {};
      if (!existingEnemy.paths[unitId]) {
        existingEnemy.paths[unitId] = [];
      }
      existingEnemy.paths[unitId] = path;
    },
    addOwnTank: (state, action) => {
      const { tankName, details, path, unitId } = action.payload;
      let existingOwnTanks = state.mapData.ownTanks.find(
        (e) => e.name === tankName,
      );
      if (!existingOwnTanks) {
        existingOwnTanks = {
          name: tankName,
          details: details || {},
          paths: {},
        };
        state.mapData.ownTanks.push(existingOwnTanks);
      }
      existingOwnTanks.details = details || {};
      if (!existingOwnTanks.paths[unitId]) {
        existingOwnTanks.paths[unitId] = [];
      }
      existingOwnTanks.paths[unitId] = path;
    },
    addForrestsAndBuildings: (state, action) => {
      const { objectName, details, path, unitId } = action.payload;
      let existingObject = state.mapData.forrestAndBuildings.find(
        (e) => e.name === objectName,
      );
      if (!existingObject) {
        existingObject = {
          name: objectName,
          details: details || {},
          paths: {},
        };
        state.mapData.forrestAndBuildings.push(existingObject);
      }
      existingObject.details = details || {};
      if (!existingObject.paths[unitId]) {
        existingObject.paths[unitId] = [];
      }
      existingObject.paths[unitId] = path;
    },
    updateTotalEnemies: (state, action) => {
      state.mapData.totalEnemies = action.payload;
    },
    updateTotalOwnTanks: (state, action) => {
      state.mapData.totalOwnTanks = action.payload;
    },
    updateTotalEnemyTanks: (state, action) => {
      state.mapData.totalEnemyTanks = action.payload;
    },
    updateTotalEnemyAPCs: (state, action) => {
      state.mapData.totalEnemyAPCs = action.payload;
    },
  },
});

export const {
  setStudent,
  setInstructor,
  setWeather,
  setTemperature,
  setWindSpeed,
  setWindDirection,
  setDifficulty,
  setMapArea,
  setExerciseTime,
  setTerrain,
  setApfsds,
  setHe,
  setHeat,
  setMg762,
  addEnemy,
  addForrestsAndBuildings,
  addOwnTank,
  updateTotalEnemies,
  updateTotalOwnTanks,
  updateTotalEnemyTanks,
  updateTotalEnemyAPCs,
} = DataArraySlice.actions;

export default DataArraySlice.reducer;
