const { expect } = require("chai");
const {
    parseJson,
} = require("../site-scrapers/SouthcoastHealth/dataFormatter");

const file = require("../lib/file");

describe("SouthCoastHealth :: test Fall River sample JSON", () => {
    const fallRiverJson = require("./SouthcoastHealth/sampleFallRiver.json");

    it("should show availability", () => {
        //
        const fallRiverResults = parseJson(fallRiverJson);

        expect(Object.keys(fallRiverResults).length).equals(3);

        const totalSlots = Object.values(fallRiverResults).reduce(
            (acc, value) => {
                acc += value.numberAvailableAppointments;
                return acc;
            },
            0
        );

        const timeStrMatch = JSON.stringify(fallRiverJson).match(/time/g);
        expect(totalSlots).equals(timeStrMatch.length);

        if (process.env.DEVELOPMENT) {
            file.write(
                `${process.cwd()}/out_FallRiver-SouthCoastHealth.json`,
                `${JSON.stringify(fallRiverResults, null, "   ")}`
            );
        }
    });
});
