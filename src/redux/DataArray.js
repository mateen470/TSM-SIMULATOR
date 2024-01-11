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
      Time: 1500,
      Rain: 0,
      Snow: 0,
      temperature: 0,
      WindSpeed: 0,
      WindDirection: 0,
    },
    totalOwnTanks: 0,
    totalEnemies: 0,
    Player: {},
    Enemy: {},
    Items: {
      House: [],
      Trees: [],
      Shop: [],
      Shack: [],
      SmallHouse: [],
      VillageHut: [],
      WareHouse: [],
      WaterTankTower: [],
      Hospital: [],
      Store: [],
      RailwayStation: [],
      Jhompri: [],
      Rocks: [],
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
      state.WeatherConditions.Time = action.payload;
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
      const { path, unitId, initialAmmo, spawning_point } = action.payload;

      if (state.Player && state.Player.id === unitId) {
        state.Player.Ammo = {
          Heat: initialAmmo.heat,
          APFSDS: initialAmmo.apfsds,
          HE: initialAmmo.he,
          MG: initialAmmo.mg762,
        };
        state.Player.SpawnLocation = {
          pointx: spawning_point.x,
          pointy: spawning_point.y,
        };
        state.Player.Path = path.map((point) => ({
          pointx: point.x,
          pointy: point.y,
        }));
      } else {
        state.Player = {
          id: unitId,
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
      }
    },
    addHouse: (state, action) => {
      const { unitId, spawning_point } = action.payload;
      const buildingExists = state.Items.House.some(
        (building) => building.id === unitId,
      );
      if (!buildingExists) {
        state.Items.House.push({
          id: unitId,
          pointx: spawning_point.x,
          pointy: spawning_point.y,
        });
      }
    },
    addShop: (state, action) => {
      const { unitId, spawning_point } = action.payload;
      const buildingExists = state.Items.Shop.some(
        (building) => building.id === unitId,
      );
      if (!buildingExists) {
        state.Items.Shop.push({
          id: unitId,
          pointx: spawning_point.x,
          pointy: spawning_point.y,
        });
      }
    },
    addShack: (state, action) => {
      const { unitId, spawning_point } = action.payload;
      const buildingExists = state.Items.Shack.some(
        (building) => building.id === unitId,
      );
      if (!buildingExists) {
        state.Items.Shack.push({
          id: unitId,
          pointx: spawning_point.x,
          pointy: spawning_point.y,
        });
      }
    },
    addSmallHouse: (state, action) => {
      const { unitId, spawning_point } = action.payload;
      const buildingExists = state.Items.SmallHouse.some(
        (building) => building.id === unitId,
      );
      if (!buildingExists) {
        state.Items.SmallHouse.push({
          id: unitId,
          pointx: spawning_point.x,
          pointy: spawning_point.y,
        });
      }
    },
    addVillageHut: (state, action) => {
      const { unitId, spawning_point } = action.payload;
      const buildingExists = state.Items.VillageHut.some(
        (building) => building.id === unitId,
      );
      if (!buildingExists) {
        state.Items.VillageHut.push({
          id: unitId,
          pointx: spawning_point.x,
          pointy: spawning_point.y,
        });
      }
    },
    addWareHouse: (state, action) => {
      const { unitId, spawning_point } = action.payload;
      const buildingExists = state.Items.WareHouse.some(
        (building) => building.id === unitId,
      );
      if (!buildingExists) {
        state.Items.WareHouse.push({
          id: unitId,
          pointx: spawning_point.x,
          pointy: spawning_point.y,
        });
      }
    },
    addTrees: (state, action) => {
      const { unitId, spawning_point } = action.payload;
      const objectExists = state.Items.Trees.some(
        (object) => object.id === unitId,
      );
      if (!objectExists) {
        state.Items.Trees.push({
          id: unitId,
          pointx: spawning_point.x,
          pointy: spawning_point.y,
        });
      }
    },
    addWaterTankTower: (state, action) => {
      const { unitId, spawning_point } = action.payload;
      const objectExists = state.Items.WaterTankTower.some(
        (object) => object.id === unitId,
      );
      if (!objectExists) {
        state.Items.WaterTankTower.push({
          id: unitId,
          pointx: spawning_point.x,
          pointy: spawning_point.y,
        });
      }
    },
    addHospital: (state, action) => {
      const { unitId, spawning_point } = action.payload;
      const objectExists = state.Items.Hospital.some(
        (object) => object.id === unitId,
      );
      if (!objectExists) {
        state.Items.Hospital.push({
          id: unitId,
          pointx: spawning_point.x,
          pointy: spawning_point.y,
        });
      }
    },
    addStore: (state, action) => {
      const { unitId, spawning_point } = action.payload;
      const objectExists = state.Items.Store.some(
        (object) => object.id === unitId,
      );
      if (!objectExists) {
        state.Items.Store.push({
          id: unitId,
          pointx: spawning_point.x,
          pointy: spawning_point.y,
        });
      }
    },
    addRailwayStation: (state, action) => {
      const { unitId, spawning_point } = action.payload;
      const objectExists = state.Items.RailwayStation.some(
        (object) => object.id === unitId,
      );
      if (!objectExists) {
        state.Items.RailwayStation.push({
          id: unitId,
          pointx: spawning_point.x,
          pointy: spawning_point.y,
        });
      }
    },
    addJhompri: (state, action) => {
      const { unitId, spawning_point } = action.payload;
      const objectExists = state.Items.Jhompri.some(
        (object) => object.id === unitId,
      );
      if (!objectExists) {
        state.Items.Jhompri.push({
          id: unitId,
          pointx: spawning_point.x,
          pointy: spawning_point.y,
        });
      }
    },
    addRocks: (state, action) => {
      const { unitId, spawning_point } = action.payload;
      const objectExists = state.Items.Rocks.some(
        (object) => object.id === unitId,
      );
      if (!objectExists) {
        state.Items.Rocks.push({
          id: unitId,
          pointx: spawning_point.x,
          pointy: spawning_point.y,
        });
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
      if (state.Player && state.Player.id === unitId) {
        state.Player = {};
      }
    },
    deleteHouse: (state, action) => {
      const unitId = action.payload;

      state.Items.House = state.Items.House.filter(
        (building) => building.id !== unitId,
      );
    },
    deleteShop: (state, action) => {
      const unitId = action.payload;

      state.Items.Shop = state.Items.Shop.filter(
        (building) => building.id !== unitId,
      );
    },
    deleteSmallHouse: (state, action) => {
      const unitId = action.payload;

      state.Items.SmallHouse = state.Items.SmallHouse.filter(
        (building) => building.id !== unitId,
      );
    },
    deleteShack: (state, action) => {
      const unitId = action.payload;

      state.Items.Shack = state.Items.Shack.filter(
        (building) => building.id !== unitId,
      );
    },
    deleteRocks: (state, action) => {
      const unitId = action.payload;

      state.Items.Rocks = state.Items.Rocks.filter(
        (building) => building.id !== unitId,
      );
    },
    deleteVillageHut: (state, action) => {
      const unitId = action.payload;

      state.Items.VillageHut = state.Items.VillageHut.filter(
        (building) => building.id !== unitId,
      );
    },
    deleteWareHouse: (state, action) => {
      const unitId = action.payload;

      state.Items.WareHouse = state.Items.WareHouse.filter(
        (building) => building.id !== unitId,
      );
    },
    deleteTrees: (state, action) => {
      const unitId = action.payload;

      state.Items.Trees = state.Items.Trees.filter(
        (object) => object.id !== unitId,
      );
    },
    deleteWaterTankTower: (state, action) => {
      const unitId = action.payload;

      state.Items.WaterTankTower = state.Items.WaterTankTower.filter(
        (object) => object.id !== unitId,
      );
    },
    deleteHospital: (state, action) => {
      const unitId = action.payload;

      state.Items.Hospital = state.Items.Hospital.filter(
        (object) => object.id !== unitId,
      );
    },
    deleteStore: (state, action) => {
      const unitId = action.payload;

      state.Items.Store = state.Items.Store.filter(
        (object) => object.id !== unitId,
      );
    },
    deleteRailwayStation: (state, action) => {
      const unitId = action.payload;

      state.Items.RailwayStation = state.Items.RailwayStation.filter(
        (object) => object.id !== unitId,
      );
    },
    deleteJhompri: (state, action) => {
      const unitId = action.payload;

      state.Items.Jhompri = state.Items.Jhompri.filter(
        (object) => object.id !== unitId,
      );
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
  addHouse,
  addShop,
  addShack,
  addTrees,
  addOwnTank,
  updateTotalEnemies,
  updateTotalOwnTanks,
  updateTotalEnemyTanks,
  updateTotalEnemyAPCs,
  deleteEnemy,
  deleteOwnTank,
  deleteHouse,
  deleteTrees,
  deleteShop,
  deleteShack,
  deleteSmallHouse,
  addSmallHouse,
  deleteVillageHut,
  addVillageHut,
  deleteWareHouse,
  addWareHouse,
  deleteWaterTankTower,
  addWaterTankTower,
  deleteHospital,
  addHospital,
  deleteStore,
  addStore,
  deleteRailwayStation,
  addRailwayStation,
  deleteJhompri,
  addJhompri,
  deleteRocks,
  addRocks,
} = DataArraySlice.actions;

export default DataArraySlice.reducer;
