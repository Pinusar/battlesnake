import {executeHeatMap} from "./strat";


test("Should avoid crashing down", () => {
    const gameState = JSON.parse("{\"game\":{\"id\":\"4e5752b0-da7d-4281-bebc-91029cf3330d\",\"ruleset\":{\"name\":\"standard\",\"version\":\"v1.2.3\",\"settings\":{\"foodSpawnChance\":15,\"minimumFood\":1,\"hazardDamagePerTurn\":0,\"hazardMap\":\"\",\"hazardMapAuthor\":\"\",\"royale\":{\"shrinkEveryNTurns\":0},\"squad\":{\"allowBodyCollisions\":false,\"sharedElimination\":false,\"sharedHealth\":false,\"sharedLength\":false}}},\"map\":\"standard\",\"timeout\":500,\"source\":\"custom\"},\"turn\":75,\"board\":{\"height\":11,\"width\":11,\"snakes\":[{\"id\":\"gs_7mvqY46j4mJCJSkjT96XkctQ\",\"name\":\"MartinTestSnake\",\"latency\":\"278\",\"health\":94,\"body\":[{\"x\":0,\"y\":1},{\"x\":0,\"y\":2},{\"x\":0,\"y\":3},{\"x\":0,\"y\":4},{\"x\":0,\"y\":5},{\"x\":0,\"y\":6}],\"head\":{\"x\":0,\"y\":1},\"length\":6,\"shout\":\"\",\"squad\":\"\",\"customizations\":{\"color\":\"#ff00ff\",\"head\":\"default\",\"tail\":\"default\"}}],\"food\":[{\"x\":10,\"y\":8},{\"x\":5,\"y\":0},{\"x\":3,\"y\":5},{\"x\":4,\"y\":1}],\"hazards\":[]},\"you\":{\"id\":\"gs_7mvqY46j4mJCJSkjT96XkctQ\",\"name\":\"MartinTestSnake\",\"latency\":\"278\",\"health\":94,\"body\":[{\"x\":0,\"y\":1},{\"x\":0,\"y\":2},{\"x\":0,\"y\":3},{\"x\":0,\"y\":4},{\"x\":0,\"y\":5},{\"x\":0,\"y\":6}],\"head\":{\"x\":0,\"y\":1},\"length\":6,\"shout\":\"\",\"squad\":\"\",\"customizations\":{\"color\":\"#ff00ff\",\"head\":\"default\",\"tail\":\"default\"}}}");

    const move = executeHeatMap(gameState)

    expect(move).toBe("right");
});

test("Should not crash", () => {
    const gameState = JSON.parse("{\"game\":{\"id\":\"2507a32b-200a-4e56-9d67-2a111389a09e\",\"ruleset\":{\"name\":\"standard\",\"version\":\"v1.2.3\",\"settings\":{\"foodSpawnChance\":15,\"minimumFood\":1,\"hazardDamagePerTurn\":0,\"hazardMap\":\"\",\"hazardMapAuthor\":\"\",\"royale\":{\"shrinkEveryNTurns\":0},\"squad\":{\"allowBodyCollisions\":false,\"sharedElimination\":false,\"sharedHealth\":false,\"sharedLength\":false}}},\"map\":\"standard\",\"timeout\":500,\"source\":\"custom\"},\"turn\":42,\"board\":{\"height\":11,\"width\":11,\"snakes\":[{\"id\":\"gs_XpfjcrGyHyY9PBvJyCtwcvjV\",\"name\":\"MartinTestSnake\",\"latency\":\"282\",\"health\":60,\"body\":[{\"x\":0,\"y\":8},{\"x\":1,\"y\":8},{\"x\":2,\"y\":8},{\"x\":3,\"y\":8}],\"head\":{\"x\":0,\"y\":8},\"length\":4,\"shout\":\"\",\"squad\":\"\",\"customizations\":{\"color\":\"#ff00ff\",\"head\":\"default\",\"tail\":\"default\"}}],\"food\":[{\"x\":5,\"y\":5},{\"x\":2,\"y\":1},{\"x\":6,\"y\":5},{\"x\":4,\"y\":1},{\"x\":9,\"y\":1},{\"x\":0,\"y\":4},{\"x\":8,\"y\":10},{\"x\":5,\"y\":2}],\"hazards\":[]},\"you\":{\"id\":\"gs_XpfjcrGyHyY9PBvJyCtwcvjV\",\"name\":\"MartinTestSnake\",\"latency\":\"282\",\"health\":60,\"body\":[{\"x\":0,\"y\":8},{\"x\":1,\"y\":8},{\"x\":2,\"y\":8},{\"x\":3,\"y\":8}],\"head\":{\"x\":0,\"y\":8},\"length\":4,\"shout\":\"\",\"squad\":\"\",\"customizations\":{\"color\":\"#ff00ff\",\"head\":\"default\",\"tail\":\"default\"}}}");

    const move = executeHeatMap(gameState)

    expect(move).toBeTruthy();
});

test("Should not crash 2", () => {
    const gameState = JSON.parse("{\"game\":{\"id\":\"4d8f8715-c87b-4cbb-bf93-c797082595ef\",\"ruleset\":{\"name\":\"standard\",\"version\":\"v1.2.3\",\"settings\":{\"foodSpawnChance\":15,\"minimumFood\":1,\"hazardDamagePerTurn\":0,\"hazardMap\":\"\",\"hazardMapAuthor\":\"\",\"royale\":{\"shrinkEveryNTurns\":0},\"squad\":{\"allowBodyCollisions\":false,\"sharedElimination\":false,\"sharedHealth\":false,\"sharedLength\":false}}},\"map\":\"standard\",\"timeout\":500,\"source\":\"custom\"},\"turn\":19,\"board\":{\"height\":11,\"width\":11,\"snakes\":[{\"id\":\"gs_cgKk4XdXqf6w9FDJqjrRc3FB\",\"name\":\"MartinTestSnake\",\"latency\":\"272\",\"health\":94,\"body\":[{\"x\":10,\"y\":3},{\"x\":9,\"y\":3},{\"x\":8,\"y\":3},{\"x\":7,\"y\":3},{\"x\":6,\"y\":3},{\"x\":5,\"y\":3}],\"head\":{\"x\":10,\"y\":3},\"length\":6,\"shout\":\"\",\"squad\":\"\",\"customizations\":{\"color\":\"#ff00ff\",\"head\":\"default\",\"tail\":\"default\"}}],\"food\":[{\"x\":1,\"y\":3},{\"x\":6,\"y\":10}],\"hazards\":[]},\"you\":{\"id\":\"gs_cgKk4XdXqf6w9FDJqjrRc3FB\",\"name\":\"MartinTestSnake\",\"latency\":\"272\",\"health\":94,\"body\":[{\"x\":10,\"y\":3},{\"x\":9,\"y\":3},{\"x\":8,\"y\":3},{\"x\":7,\"y\":3},{\"x\":6,\"y\":3},{\"x\":5,\"y\":3}],\"head\":{\"x\":10,\"y\":3},\"length\":6,\"shout\":\"\",\"squad\":\"\",\"customizations\":{\"color\":\"#ff00ff\",\"head\":\"default\",\"tail\":\"default\"}}}");

    const move = executeHeatMap(gameState)

    expect(move).toBeTruthy();
});

test("Should not collide with itself because of food", () => {
    const gameState = JSON.parse("{\"game\":{\"id\":\"29e858a8-77c0-4d79-87c7-0ce5ae801e10\",\"ruleset\":{\"name\":\"standard\",\"version\":\"v1.2.3\",\"settings\":{\"foodSpawnChance\":15,\"minimumFood\":1,\"hazardDamagePerTurn\":0,\"hazardMap\":\"\",\"hazardMapAuthor\":\"\",\"royale\":{\"shrinkEveryNTurns\":0},\"squad\":{\"allowBodyCollisions\":false,\"sharedElimination\":false,\"sharedHealth\":false,\"sharedLength\":false}}},\"map\":\"standard\",\"timeout\":500,\"source\":\"custom\"},\"turn\":110,\"board\":{\"height\":11,\"width\":11,\"snakes\":[{\"id\":\"gs_k7Q7C8pKtcJyhtBphWtVDMXb\",\"name\":\"MartinTestSnake\",\"latency\":\"276\",\"health\":55,\"body\":[{\"x\":7,\"y\":9},{\"x\":8,\"y\":9},{\"x\":9,\"y\":9},{\"x\":9,\"y\":8},{\"x\":8,\"y\":8},{\"x\":7,\"y\":8},{\"x\":6,\"y\":8},{\"x\":5,\"y\":8},{\"x\":4,\"y\":8},{\"x\":3,\"y\":8},{\"x\":2,\"y\":8},{\"x\":1,\"y\":8}],\"head\":{\"x\":7,\"y\":9},\"length\":12,\"shout\":\"\",\"squad\":\"\",\"customizations\":{\"color\":\"#ff00ff\",\"head\":\"default\",\"tail\":\"default\"}}],\"food\":[{\"x\":10,\"y\":0},{\"x\":7,\"y\":1},{\"x\":6,\"y\":0},{\"x\":9,\"y\":2},{\"x\":9,\"y\":0},{\"x\":9,\"y\":1},{\"x\":1,\"y\":2},{\"x\":2,\"y\":3},{\"x\":7,\"y\":7}],\"hazards\":[]},\"you\":{\"id\":\"gs_k7Q7C8pKtcJyhtBphWtVDMXb\",\"name\":\"MartinTestSnake\",\"latency\":\"276\",\"health\":55,\"body\":[{\"x\":7,\"y\":9},{\"x\":8,\"y\":9},{\"x\":9,\"y\":9},{\"x\":9,\"y\":8},{\"x\":8,\"y\":8},{\"x\":7,\"y\":8},{\"x\":6,\"y\":8},{\"x\":5,\"y\":8},{\"x\":4,\"y\":8},{\"x\":3,\"y\":8},{\"x\":2,\"y\":8},{\"x\":1,\"y\":8}],\"head\":{\"x\":7,\"y\":9},\"length\":12,\"shout\":\"\",\"squad\":\"\",\"customizations\":{\"color\":\"#ff00ff\",\"head\":\"default\",\"tail\":\"default\"}}}");

    const move = executeHeatMap(gameState)

    expect(move).not.toBe("down");
});

test("Should avoid dead end", () => {
    const gameState = JSON.parse("{\"game\":{\"id\":\"f4c4db9e-8a0d-4348-94e2-31d7ceef95c0\",\"ruleset\":{\"name\":\"standard\",\"version\":\"v1.2.3\",\"settings\":{\"foodSpawnChance\":15,\"minimumFood\":1,\"hazardDamagePerTurn\":0,\"hazardMap\":\"\",\"hazardMapAuthor\":\"\",\"royale\":{\"shrinkEveryNTurns\":0},\"squad\":{\"allowBodyCollisions\":false,\"sharedElimination\":false,\"sharedHealth\":false,\"sharedLength\":false}}},\"map\":\"standard\",\"timeout\":500,\"source\":\"custom\"},\"turn\":158,\"board\":{\"height\":11,\"width\":11,\"snakes\":[{\"id\":\"gs_gk4JHpJv3779Kbk6TVbRv78V\",\"name\":\"MartinTestSnake\",\"latency\":\"275\",\"health\":98,\"body\":[{\"x\":10,\"y\":2},{\"x\":10,\"y\":1},{\"x\":10,\"y\":0},{\"x\":9,\"y\":0},{\"x\":9,\"y\":1},{\"x\":8,\"y\":1},{\"x\":8,\"y\":2},{\"x\":8,\"y\":3},{\"x\":9,\"y\":3},{\"x\":9,\"y\":4},{\"x\":9,\"y\":5},{\"x\":9,\"y\":6},{\"x\":9,\"y\":7},{\"x\":8,\"y\":7},{\"x\":7,\"y\":7},{\"x\":7,\"y\":8},{\"x\":8,\"y\":8},{\"x\":9,\"y\":8},{\"x\":9,\"y\":9}],\"head\":{\"x\":10,\"y\":2},\"length\":19,\"shout\":\"\",\"squad\":\"\",\"customizations\":{\"color\":\"#ff00ff\",\"head\":\"default\",\"tail\":\"default\"}}],\"food\":[{\"x\":3,\"y\":2},{\"x\":5,\"y\":0},{\"x\":5,\"y\":1},{\"x\":3,\"y\":0},{\"x\":2,\"y\":5},{\"x\":3,\"y\":5},{\"x\":2,\"y\":8},{\"x\":4,\"y\":1}],\"hazards\":[]},\"you\":{\"id\":\"gs_gk4JHpJv3779Kbk6TVbRv78V\",\"name\":\"MartinTestSnake\",\"latency\":\"275\",\"health\":98,\"body\":[{\"x\":10,\"y\":2},{\"x\":10,\"y\":1},{\"x\":10,\"y\":0},{\"x\":9,\"y\":0},{\"x\":9,\"y\":1},{\"x\":8,\"y\":1},{\"x\":8,\"y\":2},{\"x\":8,\"y\":3},{\"x\":9,\"y\":3},{\"x\":9,\"y\":4},{\"x\":9,\"y\":5},{\"x\":9,\"y\":6},{\"x\":9,\"y\":7},{\"x\":8,\"y\":7},{\"x\":7,\"y\":7},{\"x\":7,\"y\":8},{\"x\":8,\"y\":8},{\"x\":9,\"y\":8},{\"x\":9,\"y\":9}],\"head\":{\"x\":10,\"y\":2},\"length\":19,\"shout\":\"\",\"squad\":\"\",\"customizations\":{\"color\":\"#ff00ff\",\"head\":\"default\",\"tail\":\"default\"}}}");

    const move = executeHeatMap(gameState)

    expect(move).toBe("up");
});

test("Should avoid dead end 2", () => {
    const gameState = JSON.parse("{\"game\":{\"id\":\"d3693e13-f154-4a0a-8000-50b6422901f6\",\"ruleset\":{\"name\":\"standard\",\"version\":\"v1.2.3\",\"settings\":{\"foodSpawnChance\":15,\"minimumFood\":1,\"hazardDamagePerTurn\":0,\"hazardMap\":\"\",\"hazardMapAuthor\":\"\",\"royale\":{\"shrinkEveryNTurns\":0},\"squad\":{\"allowBodyCollisions\":false,\"sharedElimination\":false,\"sharedHealth\":false,\"sharedLength\":false}}},\"map\":\"standard\",\"timeout\":500,\"source\":\"custom\"},\"turn\":162,\"board\":{\"height\":11,\"width\":11,\"snakes\":[{\"id\":\"gs_XVCYbrwRpbcPM7yWdyTjCc3M\",\"name\":\"MartinTestSnake\",\"latency\":\"316\",\"health\":100,\"body\":[{\"x\":10,\"y\":8},{\"x\":9,\"y\":8},{\"x\":9,\"y\":9},{\"x\":8,\"y\":9},{\"x\":8,\"y\":10},{\"x\":7,\"y\":10},{\"x\":6,\"y\":10},{\"x\":5,\"y\":10},{\"x\":5,\"y\":9},{\"x\":4,\"y\":9},{\"x\":3,\"y\":9},{\"x\":2,\"y\":9},{\"x\":2,\"y\":10},{\"x\":1,\"y\":10},{\"x\":0,\"y\":10},{\"x\":0,\"y\":9},{\"x\":1,\"y\":9},{\"x\":1,\"y\":8},{\"x\":1,\"y\":7},{\"x\":2,\"y\":7},{\"x\":3,\"y\":7},{\"x\":4,\"y\":7},{\"x\":4,\"y\":7}],\"head\":{\"x\":10,\"y\":8},\"length\":23,\"shout\":\"\",\"squad\":\"\",\"customizations\":{\"color\":\"#ff00ff\",\"head\":\"default\",\"tail\":\"default\"}}],\"food\":[{\"x\":10,\"y\":3},{\"x\":5,\"y\":3},{\"x\":10,\"y\":1},{\"x\":6,\"y\":2},{\"x\":7,\"y\":1}],\"hazards\":[]},\"you\":{\"id\":\"gs_XVCYbrwRpbcPM7yWdyTjCc3M\",\"name\":\"MartinTestSnake\",\"latency\":\"316\",\"health\":100,\"body\":[{\"x\":10,\"y\":8},{\"x\":9,\"y\":8},{\"x\":9,\"y\":9},{\"x\":8,\"y\":9},{\"x\":8,\"y\":10},{\"x\":7,\"y\":10},{\"x\":6,\"y\":10},{\"x\":5,\"y\":10},{\"x\":5,\"y\":9},{\"x\":4,\"y\":9},{\"x\":3,\"y\":9},{\"x\":2,\"y\":9},{\"x\":2,\"y\":10},{\"x\":1,\"y\":10},{\"x\":0,\"y\":10},{\"x\":0,\"y\":9},{\"x\":1,\"y\":9},{\"x\":1,\"y\":8},{\"x\":1,\"y\":7},{\"x\":2,\"y\":7},{\"x\":3,\"y\":7},{\"x\":4,\"y\":7},{\"x\":4,\"y\":7}],\"head\":{\"x\":10,\"y\":8},\"length\":23,\"shout\":\"\",\"squad\":\"\",\"customizations\":{\"color\":\"#ff00ff\",\"head\":\"default\",\"tail\":\"default\"}}}");

    const move = executeHeatMap(gameState)

    expect(move).toBe("down");
});

test("Should avoid head to head", () => {
    const gameState = JSON.parse("{\"game\":{\"id\":\"b5785e1c-7f62-4aed-af37-b71ac920b9a6\",\"ruleset\":{\"name\":\"standard\",\"version\":\"v1.2.3\",\"settings\":{\"foodSpawnChance\":15,\"minimumFood\":1,\"hazardDamagePerTurn\":0,\"hazardMap\":\"\",\"hazardMapAuthor\":\"\",\"royale\":{\"shrinkEveryNTurns\":0},\"squad\":{\"allowBodyCollisions\":false,\"sharedElimination\":false,\"sharedHealth\":false,\"sharedLength\":false}}},\"map\":\"standard\",\"timeout\":500,\"source\":\"custom\"},\"turn\":91,\"board\":{\"height\":11,\"width\":11,\"snakes\":[{\"id\":\"gs_pYRwS7yFvKV4m43hgJ7mvfPX\",\"name\":\"MartinTestSnake\",\"latency\":\"274\",\"health\":75,\"body\":[{\"x\":1,\"y\":8},{\"x\":2,\"y\":8},{\"x\":3,\"y\":8},{\"x\":4,\"y\":8},{\"x\":5,\"y\":8},{\"x\":6,\"y\":8},{\"x\":7,\"y\":8},{\"x\":8,\"y\":8},{\"x\":9,\"y\":8},{\"x\":9,\"y\":7}],\"head\":{\"x\":1,\"y\":8},\"length\":10,\"shout\":\"\",\"squad\":\"\",\"customizations\":{\"color\":\"#ff00ff\",\"head\":\"default\",\"tail\":\"default\"}},{\"id\":\"gs_RvFd84PDmWD9mhpxPKmh6kdb\",\"name\":\"Hungry Bot\",\"latency\":\"1\",\"health\":94,\"body\":[{\"x\":2,\"y\":7},{\"x\":2,\"y\":6},{\"x\":2,\"y\":5},{\"x\":2,\"y\":4},{\"x\":3,\"y\":4},{\"x\":4,\"y\":4},{\"x\":4,\"y\":3},{\"x\":4,\"y\":2},{\"x\":4,\"y\":1},{\"x\":4,\"y\":0},{\"x\":5,\"y\":0},{\"x\":6,\"y\":0},{\"x\":7,\"y\":0},{\"x\":8,\"y\":0},{\"x\":9,\"y\":0},{\"x\":9,\"y\":1},{\"x\":8,\"y\":1},{\"x\":7,\"y\":1}],\"head\":{\"x\":2,\"y\":7},\"length\":18,\"shout\":\"\",\"squad\":\"\",\"customizations\":{\"color\":\"#00cc00\",\"head\":\"alligator\",\"tail\":\"alligator\"}}],\"food\":[{\"x\":1,\"y\":7}],\"hazards\":[]},\"you\":{\"id\":\"gs_pYRwS7yFvKV4m43hgJ7mvfPX\",\"name\":\"MartinTestSnake\",\"latency\":\"274\",\"health\":75,\"body\":[{\"x\":1,\"y\":8},{\"x\":2,\"y\":8},{\"x\":3,\"y\":8},{\"x\":4,\"y\":8},{\"x\":5,\"y\":8},{\"x\":6,\"y\":8},{\"x\":7,\"y\":8},{\"x\":8,\"y\":8},{\"x\":9,\"y\":8},{\"x\":9,\"y\":7}],\"head\":{\"x\":1,\"y\":8},\"length\":10,\"shout\":\"\",\"squad\":\"\",\"customizations\":{\"color\":\"#ff00ff\",\"head\":\"default\",\"tail\":\"default\"}}}");

    const move = executeHeatMap(gameState)

    expect(move).not.toBe("down");
});