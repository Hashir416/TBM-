const mongoose = require("mongoose");

let tbManagerSchema = mongoose.Schema(
  {
    tournamentName: String, // Name of the tournament
    teams: [
      {
        teamName: String, // Name of the team
        members: [String], // List of team members
      },
    ],
    numberOfTeams: Number, // Total number of teams
    startDate: Date, // Tournament start date
    endDate: Date, // Tournament end date
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"], // Status of the tournament
      default: "Upcoming",
    },
  },
  {
    collection: "TBManager", //  MongoDB collection name
  }
);

module.exports = mongoose.model("TBManager", tbManagerSchema);


