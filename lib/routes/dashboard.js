'use strict';

var express = require('express');
var Dashboard = express.Router();
var DashboardCtrl = require('../controllers/DashboardCtrl');

/* GET Dashboard Page. */
Dashboard.get('/:account_id', DashboardCtrl.getAccountDashboard);

module.exports = Dashboard;
