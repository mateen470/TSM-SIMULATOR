import { createSlice } from '@reduxjs/toolkit';

export const DataArraySlice = createSlice({
  name: 'dataArray',
  initialState: {
    onlyOneOwnTank: false,
    ExerciseInfo: {
      mapArea: 0,
      exerciseTime: '',
      terrain: '',
      totalEnemyTanks: 0,
      totalEnemyAPCs: 0,
      student: '',
      instructor: '',
      difficulty: '',
    },
    WeatherConditions: {
      weather: '',
      temperature: 0,
      WindSpeed: 0,
      WindDirection: 0,
    },
    totalOwnTanks: 0,
    totalEnemies: 0,
    Player: {},
    Enemy: {},
    Items: {
      House: {},
      Tree: {},
    },
  },
  reducers: {
    setOnlyOneOwnTank: (state, action) => {
      state.onlyOneOwnTank = action.payload;
    },
    setStudent: (state, action) => {
      state.ExerciseInfo.student = action.payload;
    },
    setInstructor: (state, action) => {
      state.ExerciseInfo.instructor = action.payload;
    },
    setWeather: (state, action) => {
      state.WeatherConditions.weather = action.payload;
    },
    setTemperature: (state, action) => {
      state.WeatherConditions.temperature = action.payload;
    },
    setWindSpeed: (state, action) => {
      state.WeatherConditions.WindSpeed = action.payload;
    },
    setWindDirection: (state, action) => {
      state.WeatherConditions.WindDirection = action.payload;
    },
    setDifficulty: (state, action) => {
      state.ExerciseInfo.difficulty = action.payload;
    },
    setMapArea: (state, action) => {
      state.ExerciseInfo.mapArea = action.payload;
    },
    setExerciseTime: (state, action) => {
      state.ExerciseInfo.exerciseTime = action.payload;
    },
    setTerrain: (state, action) => {
      state.ExerciseInfo.terrain = action.payload;
    },
    addEnemy: (state, action) => {
      const { enemyName, path, unitId, initialAmmo, spawning_point } =
        action.payload;

      if (!state.Enemy[enemyName]) {
        state.Enemy[enemyName] = [];
      }

      const enemyIndex = state.Enemy[enemyName].findIndex(
        (enemy) => enemy.unitId === unitId,
      );

      if (enemyIndex !== -1) {
        state.Enemy[enemyName][enemyIndex].Path = path.map((point) => ({
          pointx: point.x,
          pointy: point.y,
        }));
        state.Enemy[enemyName][enemyIndex].Ammo = {
          Heat: initialAmmo.heat,
          APFSDS: initialAmmo.apfsds,
          HE: initialAmmo.he,
          MG: initialAmmo.mg762,
        };
      } else {
        const newEnemy = {
          unitId: unitId,
          Ammo: {
            Heat: initialAmmo.heat,
            APFSDS: initialAmmo.apfsds,
            HE: initialAmmo.he,
            MG: initialAmmo.mg762,
          },
          SpawnLocation: {
            pointx: spawning_point.x,
            pointy: spawning_point.y,
          },
          Path: path.map((point) => ({
            pointx: point.x,
            pointy: point.y,
          })),
        };

        state.Enemy[enemyName].push(newEnemy);
      }
    },
    addEnemyCar: (state, action) => {
      const { enemyName, path, unitId, spawning_point } = action.payload;

      if (!state.Enemy[enemyName]) {
        state.Enemy[enemyName] = [];
      }

      const enemyIndex = state.Enemy[enemyName].findIndex(
        (enemy) => enemy.unitId === unitId,
      );

      if (enemyIndex !== -1) {
        state.Enemy[enemyName][enemyIndex].Path = path.map((point) => ({
          pointx: point.x,
          pointy: point.y,
        }));
      } else {
        const newEnemy = {
          unitId: unitId,
          SpawnLocation: {
            pointx: spawning_point.x,
            pointy: spawning_point.y,
          },
          Path: path.map((point) => ({
            pointx: point.x,
            pointy: point.y,
          })),
        };

        state.Enemy[enemyName].push(newEnemy);
      }
    },
    addOwnTank: (state, action) => {
      const { tankName, path, unitId, initialAmmo, spawning_point } =
        action.payload;

      if (!state.Player[tankName]) {
        state.Player[tankName] = [];
      }

      const tankIndex = state.Player[tankName].findIndex(
        (tank) => tank.unitId === unitId,
      );

      if (tankIndex !== -1) {
        state.Player[tankName][tankIndex].Path = path.map((point) => ({
          pointx: point.x,
          pointy: point.y,
        }));
        state.Player[tankName][tankIndex].Ammo = {
          Heat: initialAmmo.heat,
          APFSDS: initialAmmo.apfsds,
          HE: initialAmmo.he,
          MG: initialAmmo.mg762,
        };
      } else {
        const newTank = {
          unitId: unitId,
          Ammo: {
            Heat: initialAmmo.heat,
            APFSDS: initialAmmo.apfsds,
            HE: initialAmmo.he,
            MG: initialAmmo.mg762,
          },
          SpawnLocation: {
            pointx: spawning_point.x,
            pointy: spawning_point.y,
          },
          Path: path.map((point) => ({
            pointx: point.x,
            pointy: point.y,
          })),
        };

        state.Player[tankName].push(newTank);
      }
    },
    addBuildings: (state, action) => {
      const { objectName, path, unitId, spawning_point } = action.payload;

      if (!state.Items.House[objectName]) {
        state.Items.House[objectName] = [];
      }

      const houseIndex = state.Items.House[objectName].findIndex(
        (house) => house.unitId === unitId,
      );

      if (houseIndex !== -1) {
        state.Items.House[objectName][houseIndex].Path = path.map((point) => ({
          pointx: point.x,
          pointy: point.y,
        }));
      } else {
        const newHouse = {
          unitId: unitId,
          SpawnLocation: {
            pointx: spawning_point.x,
            pointy: spawning_point.y,
          },
          Path: path.map((point) => ({
            pointx: point.x,
            pointy: point.y,
          })),
        };

        state.Items.House[objectName].push(newHouse);
      }
    },
    addForrest: (state, action) => {
      const { objectName, path, unitId, spawning_point } = action.payload;

      if (!state.Items.Tree[objectName]) {
        state.Items.Tree[objectName] = [];
      }

      const treeIndex = state.Items.Tree[objectName].findIndex(
        (tree) => tree.unitId === unitId,
      );

      if (treeIndex !== -1) {
        state.Items.Tree[objectName][treeIndex].Path = path.map((point) => ({
          pointx: point.x,
          pointy: point.y,
        }));
      } else {
        const newTree = {
          unitId: unitId,
          SpawnLocation: {
            pointx: spawning_point.x,
            pointy: spawning_point.y,
          },
          Path: path.map((point) => ({
            pointx: point.x,
            pointy: point.y,
          })),
        };

        state.Items.Tree[objectName].push(newTree);
      }
    },
    updateTotalEnemies: (state, action) => {
      state.totalEnemies = action.payload;
    },
    updateTotalOwnTanks: (state, action) => {
      state.totalOwnTanks = action.payload;
    },
    updateTotalEnemyTanks: (state, action) => {
      state.ExerciseInfo.totalEnemyTanks = action.payload;
    },
    updateTotalEnemyAPCs: (state, action) => {
      state.ExerciseInfo.totalEnemyAPCs = action.payload;
    },
    deleteEnemy: (state, action) => {
      const unitId = action.payload;
      Object.keys(state.Enemy).forEach((enemyName) => {
        state.Enemy[enemyName] = state.Enemy[enemyName].filter(
          (enemy) => enemy.unitId !== unitId,
        );
        if (state.Enemy[enemyName].length === 0) {
          delete state.Enemy[enemyName];
        }
      });
    },
    deleteOwnTank: (state, action) => {
      const unitId = action.payload;
      Object.keys(state.Player).forEach((tankName) => {
        state.Player[tankName] = state.Player[tankName].filter(
          (tank) => tank.unitId !== unitId,
        );
        if (state.Player[tankName].length === 0) {
          delete state.Player[tankName];
        }
      });
    },
    deleteBuilding: (state, action) => {
      const unitId = action.payload;
      Object.keys(state.Items.House).forEach((objectName) => {
        state.Items.House[objectName] = state.Items.House[objectName].filter(
          (object) => object.unitId !== unitId,
        );
        if (state.Items.House[objectName].length === 0) {
          delete state.Items.House[objectName];
        }
      });
    },
    deleteForrest: (state, action) => {
      const unitId = action.payload;
      Object.keys(state.Items.Tree).forEach((objectName) => {
        state.Items.Tree[objectName] = state.Items.Tree[objectName].filter(
          (object) => object.unitId !== unitId,
        );
        if (state.Items.Tree[objectName].length === 0) {
          delete state.Items.Tree[objectName];
        }
      });
    },
  },
});

export const {
  setOnlyOneOwnTank,
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
  addEnemy,
  addEnemyCar,
  addBuildings,
  addForrest,
  addOwnTank,
  updateTotalEnemies,
  updateTotalOwnTanks,
  updateTotalEnemyTanks,
  updateTotalEnemyAPCs,
  deleteEnemy,
  deleteOwnTank,
  deleteBuilding,
  deleteForrest,
} = DataArraySlice.actions;

export default DataArraySlice.reducer;
