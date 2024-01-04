import { createSlice } from '@reduxjs/toolkit';

export const DataArraySlice = createSlice({
  name: 'dataArray',
  initialState: {
    student: '',
    instructor: '',
    difficulty: '',
    onlyOneOwnTank: false,
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
    mapData: {
      totalOwnTanks: 0,
      totalEnemies: 0,
      totalEnemyTanks: 0,
      totalEnemyAPCs: 0,
      ownTanks: [],
      Enemy: [],
      Items: {
        Warehouse: [],
        tree: [],
      },
    },
  },
  reducers: {
    setOnlyOneOwnTank: (state, action) => {
      state.onlyOneOwnTank = action.payload;
    },
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
    addEnemy: (state, action) => {
      const { enemyName, path, unitId, initialAmmo, spawning_point } =
        action.payload;
      let existingEnemy = state.mapData.Enemy.find((e) => e.name === enemyName);

      if (!existingEnemy) {
        existingEnemy = {
          name: enemyName,
          [unitId]: {
            ammo: initialAmmo,
            path: path.map((point) => ({
              pointx: point.x,
              pointy: point.y,
            })),
            spawning_point: {
              pointx: spawning_point.x,
              pointy: spawning_point.y,
            },
          },
        };
        state.mapData.Enemy.push(existingEnemy);
      } else {
        existingEnemy[unitId] = {
          ammo: initialAmmo,
          path: path.map((point) => ({
            pointx: point.x,
            pointy: point.y,
          })),
          spawning_point: {
            pointx: spawning_point.x,
            pointy: spawning_point.y,
          },
        };
      }
    },
    addEnemyCar: (state, action) => {
      const { enemyName, path, unitId, spawning_point } = action.payload;
      let existingEnemy = state.mapData.Enemy.find((e) => e.name === enemyName);

      if (!existingEnemy) {
        existingEnemy = {
          name: enemyName,
          [unitId]: {
            path: path.map((point) => ({
              pointx: point.x,
              pointy: point.y,
            })),
            spawning_point: {
              pointx: spawning_point.x,
              pointy: spawning_point.y,
            },
          },
        };
        state.mapData.Enemy.push(existingEnemy);
      } else {
        existingEnemy[unitId] = {
          path: path.map((point) => ({
            pointx: point.x,
            pointy: point.y,
          })),
          spawning_point: {
            pointx: spawning_point.x,
            pointy: spawning_point.y,
          },
        };
      }
    },
    addOwnTank: (state, action) => {
      const { tankName, path, unitId, initialAmmo, spawning_point } =
        action.payload;
      let existingOwnTanks = state.mapData.ownTanks.find(
        (e) => e.name === tankName,
      );

      if (!existingOwnTanks) {
        existingOwnTanks = {
          name: tankName,
          paths: {},
          initialAmmo: {},
          spawning_point: {
            pointx: spawning_point.x,
            pointy: spawning_point.y,
          },
        };
        state.mapData.ownTanks.push(existingOwnTanks);
      }
      if (!existingOwnTanks.paths[unitId]) {
        existingOwnTanks.paths[unitId] = [];
      }
      existingOwnTanks.paths[unitId] = path.map((point) => ({
        pointx: point.x,
        pointy: point.y,
      }));
      existingOwnTanks.initialAmmo[unitId] = initialAmmo;
    },
    addBuildings: (state, action) => {
      const { objectName, path, unitId, spawning_point } = action.payload;
      let existingObject = state.mapData.Items.Warehouse.find(
        (e) => e.name === objectName,
      );

      if (!existingObject) {
        existingObject = {
          name: objectName,
          [unitId]: {
            path: path.map((point) => ({
              pointx: point.x,
              pointy: point.y,
            })),
            spawning_point: {
              pointx: spawning_point.x,
              pointy: spawning_point.y,
            },
          },
        };
        state.mapData.Items.Warehouse.push(existingObject);
      } else {
        existingObject[unitId] = {
          path: path.map((point) => ({
            pointx: point.x,
            pointy: point.y,
          })),
          spawning_point: {
            pointx: spawning_point.x,
            pointy: spawning_point.y,
          },
        };
      }
    },
    addForrest: (state, action) => {
      const { objectName, path, unitId, spawning_point } = action.payload;
      let existingObject = state.mapData.Items.tree.find(
        (e) => e.name === objectName,
      );

      if (!existingObject) {
        existingObject = {
          name: objectName,
          [unitId]: {
            path: path.map((point) => ({
              pointx: point.x,
              pointy: point.y,
            })),
            spawning_point: {
              pointx: spawning_point.x,
              pointy: spawning_point.y,
            },
          },
        };
        state.mapData.Items.tree.push(existingObject);
      } else {
        existingObject[unitId] = {
          path: path.map((point) => ({
            pointx: point.x,
            pointy: point.y,
          })),
          spawning_point: {
            pointx: spawning_point.x,
            pointy: spawning_point.y,
          },
        };
      }
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
    deleteEnemy: (state, action) => {
      const unitId = action.payload;

      state.mapData.Enemy.forEach((enemy) => {
        if (enemy.units) {
          delete enemy.units[unitId];
        }
      });

      state.mapData.Enemy = state.mapData.Enemy.filter((enemy) => {
        return enemy.units && Object.keys(enemy.units).length !== 0;
      });
    },

    deleteOwnTank: (state, action) => {
      const unitId = action.payload;
      state.mapData.ownTanks = state.mapData.ownTanks.filter(
        (tank) => !tank.paths[unitId],
      );
    },
    deleteBuilding: (state, action) => {
      const unitId = action.payload;
      state.mapData.Items.Warehouse.forEach((object) => {
        if (object.units) {
          delete object.units[unitId];
        }
      });

      state.mapData.Items.Warehouse = state.mapData.Items.Warehouse.filter(
        (object) => {
          return object.units && Object.keys(object.units).length !== 0;
        },
      );
    },
    deleteForrest: (state, action) => {
      const unitId = action.payload;
      state.mapData.Items.tree.forEach((object) => {
        if (object.units) {
          delete object.units[unitId];
        }
      });

      state.mapData.Items.tree = state.mapData.Items.tree.filter((object) => {
        return object.units && Object.keys(object.units).length !== 0;
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
