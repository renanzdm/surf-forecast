"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = void 0;
const beach_1 = require("@src/models/beach");
const waveHeights = {
    ankleToKnee: {
        min: 0.3,
        max: 1.0,
    },
    waistHigh: {
        min: 1.0,
        max: 2.0,
    },
    headHigh: {
        min: 2.0,
        max: 2.5,
    },
};
class Rating {
    constructor(beach) {
        this.beach = beach;
    }
    getRateForPoint(point) {
        const swellDirection = this.getPositionFromLocation(point.swellDirection);
        const windDirection = this.getPositionFromLocation(point.windDirection);
        const windAndWaveRating = this.getRatingBasedOnWindAndWavePositions(swellDirection, windDirection);
        const swellHeightRating = this.getRatingForSwellSize(point.swellHeight);
        const swellPeriodRating = this.getRatingForSwellPeriod(point.swellPeriod);
        const finalRating = (windAndWaveRating + swellHeightRating + swellPeriodRating) / 3;
        return Math.round(finalRating);
    }
    getRatingBasedOnWindAndWavePositions(waveDirection, windDirection) {
        if (waveDirection === windDirection) {
            return 1;
        }
        else if (this.isWindOffShore(waveDirection, windDirection)) {
            return 5;
        }
        return 3;
    }
    isWindOffShore(waveDirection, windDirection) {
        return ((waveDirection === beach_1.GeoPosition.N &&
            windDirection === beach_1.GeoPosition.S &&
            this.beach.position === beach_1.GeoPosition.N) ||
            (waveDirection === beach_1.GeoPosition.S &&
                windDirection === beach_1.GeoPosition.N &&
                this.beach.position === beach_1.GeoPosition.S) ||
            (waveDirection === beach_1.GeoPosition.E &&
                windDirection === beach_1.GeoPosition.W &&
                this.beach.position === beach_1.GeoPosition.E) ||
            (waveDirection === beach_1.GeoPosition.W &&
                windDirection === beach_1.GeoPosition.E &&
                this.beach.position === beach_1.GeoPosition.W));
    }
    getRatingForSwellPeriod(period) {
        if (period < 7)
            return 1;
        if (period < 10)
            return 2;
        if (period < 14)
            return 4;
        return 5;
    }
    getRatingForSwellSize(height) {
        if (height < waveHeights.ankleToKnee.min)
            return 1;
        if (height < waveHeights.ankleToKnee.max)
            return 2;
        if (height < waveHeights.waistHigh.max)
            return 3;
        return 5;
    }
    getPositionFromLocation(coordinates) {
        if (coordinates < 50)
            return beach_1.GeoPosition.N;
        if (coordinates < 120)
            return beach_1.GeoPosition.E;
        if (coordinates < 220)
            return beach_1.GeoPosition.S;
        if (coordinates < 310)
            return beach_1.GeoPosition.W;
        return beach_1.GeoPosition.N;
    }
}
exports.Rating = Rating;
//# sourceMappingURL=rating.js.map