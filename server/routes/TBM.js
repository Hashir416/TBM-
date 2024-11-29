var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// Import the Tournament Bracket Manager model
let Tournament = require('../model/TBM.js');
let tournamentController = require('../controllers/TBM.js'); // Updated controller name

/* Get route for the tournament manager - Read Operation */
router.get('/', async (req, res, next) => {
    try {
        const TournamentList = await Tournament.find(); 
        res.render('TBM/list', { 
            title: 'Tournaments', 
            TournamentList: TournamentList 
        });
    } catch (err) {
        console.error(err);
        res.render('TBM/list', { 
            error: 'Error on the server'
        });
    }
});

/* Create Operation --> Get route for displaying the Add Page */
router.get('/add', async (req, res, next) => {
    try {
        res.render('TBM/add', {
            title: 'Add Tournament'
        });
    } catch (err) {
        console.error(err);
        res.render('TBM/list', {
            error: 'Error on the server'
        });
    }
});

/* Create Operation --> Post route for processing the Add Page */
router.post('/add', async (req, res, next) => {
    try {
        let newTournament = new Tournament({
            "tournamentName": req.body.tournamentName,
            "teams": req.body.teams.split(','), // Split team names into an array
            "numberOfTeams": req.body.numberOfTeams,
            "startDate": req.body.startDate,
            "endDate": req.body.endDate,
            "status": req.body.status
        });
        await Tournament.create(newTournament);

        // Fetch the updated list of tournaments to render the list page
        const TournamentList = await Tournament.find();
        res.render('TBM/list', { 
            title: 'Tournaments', 
            TournamentList: TournamentList 
        });
    } catch (err) {
        console.error(err);
        res.render('TBM/list', {
            title: 'Tournaments',
            error: 'Error on the server'
        });
    }
});



/* Update Operation --> Get route for displaying the Edit Page */
router.get('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const tournamentToEdit = await Tournament.findById(id);
        res.render('TBM/edit', {
            title: 'Edit Tournament',
            Tournament: tournamentToEdit
        });
    } catch (err) {
        console.error(err);
        next(err); // Passing the error
    }
});

/* Update Operation --> Post route for processing the Edit Page */
router.post('/edit/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let updatedTournament = {
            "_id": id,
            "tournamentName": req.body.tournamentName,
            "teams": req.body.teams,
            "numberOfTeams": req.body.numberOfTeams,
            "startDate": req.body.startDate,
            "endDate": req.body.endDate,
            "status": req.body.status
        };
        Tournament.findByIdAndUpdate(id, updatedTournament).then(() => {
            res.redirect('/tournaments'); // path
        });
    } catch (err) {
        console.error(err);
        res.render('TBM/list', {
            error: 'Error on the server'
        });
    }
});

/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        await Tournament.deleteOne({ _id: id });
        res.redirect('/tournaments'); //  path
    } catch (err) {
        console.error(err);
        res.render('TBM/list', {
            error: 'Error on the server'
        });
    }
});

module.exports = router;
