import type { Landmark } from "../types/landmarks";

interface LandmarkStats {
  name: string;
  samples: number;

  averageDeltaX: number;
  averageDeltaY: number;
  averageDeltaZ: number;

  averageMovement: number;
  maxMovement: number;

  averageVisibility: number;
  averagePresence: number;
}

interface PreviousLandmark {
  x: number;
  y: number;
  z: number;
}

const TRACKED_LANDMARKS: Record<number, string> = {
  0: "Nose",

  11: "Left Shoulder",
  12: "Right Shoulder",

  13: "Left Elbow",
  14: "Right Elbow",

  15: "Left Wrist",
  16: "Right Wrist",

  23: "Left Hip",
  24: "Right Hip",

  25: "Left Knee",
  26: "Right Knee",

  27: "Left Ankle",
  28: "Right Ankle",
};

export class RawLandmarkDiagnostics {
  private previous: Map<
    number,
    PreviousLandmark
  > = new Map();

  private stats: Map<
    number,
    LandmarkStats
  > = new Map();

  update(landmarks: Landmark[]): void {
    for (const [indexString, name] of Object.entries(
      TRACKED_LANDMARKS,
    )) {
      const index = Number(indexString);

      const landmark = landmarks[index];

      if (!landmark) {
        continue;
      }

      if (
        !Number.isFinite(landmark.x) ||
        !Number.isFinite(landmark.y) ||
        !Number.isFinite(landmark.z)
      ) {
        continue;
      }

      const previous =
        this.previous.get(index);

      if (!previous) {
        this.previous.set(index, {
          x: landmark.x,
          y: landmark.y,
          z: landmark.z,
        });

        this.stats.set(index, {
          name,
          samples: 0,

          averageDeltaX: 0,
          averageDeltaY: 0,
          averageDeltaZ: 0,

          averageMovement: 0,
          maxMovement: 0,

          averageVisibility: 0,
          averagePresence: 0,
        });

        continue;
      }

      const deltaX =
        Math.abs(
          landmark.x - previous.x,
        );

      const deltaY =
        Math.abs(
          landmark.y - previous.y,
        );

      const deltaZ =
        Math.abs(
          landmark.z - previous.z,
        );

      const movement = Math.sqrt(
        deltaX * deltaX +
        deltaY * deltaY +
        deltaZ * deltaZ,
      );

      const existing =
        this.stats.get(index);

      if (!existing) {
        continue;
      }

      const samples =
        existing.samples + 1;

      existing.averageDeltaX =
        this.runningAverage(
          existing.averageDeltaX,
          deltaX,
          samples,
        );

      existing.averageDeltaY =
        this.runningAverage(
          existing.averageDeltaY,
          deltaY,
          samples,
        );

      existing.averageDeltaZ =
        this.runningAverage(
          existing.averageDeltaZ,
          deltaZ,
          samples,
        );

      existing.averageMovement =
        this.runningAverage(
          existing.averageMovement,
          movement,
          samples,
        );

      existing.maxMovement =
        Math.max(
          existing.maxMovement,
          movement,
        );

      const visibility =
        landmark.visibility ?? 0;

      const presence =
        landmark.presence ?? 0;

      existing.averageVisibility =
        this.runningAverage(
          existing.averageVisibility,
          visibility,
          samples,
        );

      existing.averagePresence =
        this.runningAverage(
          existing.averagePresence,
          presence,
          samples,
        );

      existing.samples = samples;

      this.previous.set(index, {
        x: landmark.x,
        y: landmark.y,
        z: landmark.z,
      });
    }
  }

  private runningAverage(
    current: number,
    value: number,
    count: number,
  ): number {
    return (
      current +
      (value - current) / count
    );
  }

  getStats(): LandmarkStats[] {
    return Array.from(
      this.stats.values(),
    );
  }

  getOverallAverageMovement(): number {
    const values = this.getStats();

    if (values.length === 0) {
      return 0;
    }

    return (
      values.reduce(
        (sum, item) =>
          sum + item.averageMovement,
        0,
      ) / values.length
    );
  }

  getOverallMaxMovement(): number {
    const values = this.getStats();

    if (values.length === 0) {
      return 0;
    }

    return Math.max(
      ...values.map(
        (item) => item.maxMovement,
      ),
    );
  }

  reset(): void {
    this.previous.clear();
    this.stats.clear();
  }
}