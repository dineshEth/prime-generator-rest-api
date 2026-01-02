import {
    getAllLogs,
    getAllStrategies,
    getLogsByUserId,
    insertLog
} from "../db/methods.table.js"
import { ApiResponse } from "../api/response.api.js"
import { ApiError } from "../api/error.api.js"
import {strategySelector} from '../utils/algoSelector.js'
// import { primeBtwnStartEndHALF, primeBtwnStartEndSQRT, primeBtwnStartSEIVE } from "../methods/index.js"


const valid_strategies = ["BHN","BSN","SOE","FBHN","FBSN","FSOE"]; 

const addLogHandler = async (req,res,next) => {
    try {
        // get log data from req body
        const {start,end} = req?.body;
        const strategy = req?.body?.strategy || "BHN"; // default
        

        // strategy validation
        if (!valid_strategies.includes(strategy)) {
            return next(new ApiError(400, "Invalid strategy"));
        }
        
        // validate input
        if (!start || !end) {
            return next(new ApiError(400, "Start and end times are required"));
        }
        // validate input start and end are numbers
        if (isNaN(start) || isNaN(end) || start < 0 || end < 0 || start >= end) {
            return next(new ApiError(400, "Start and end must be numbers, start must be less than end, and both must be non-negative"));
        }

        // TODO : strategy code validation

        // get user from req
        const user = req?.user; // Assuming auth middleware adds user info to req
        if (!user) {
            return next(new ApiError(401, "Unauthorized"));
        }

        const result = strategySelector(start,end, strategy)
        
        // time elapsed
        const time_elapsed= result?.timeElapsed // ms
        const primes_count = result?.primeCount;

        // insert log
        const log = await insertLog(start, end, time_elapsed, primes_count, strategy, user.id);

        //validate log insertion
        if (!log) {
            return next (new ApiError(500, "Failed to insert log"));
        }

        // return response
        return res.status(200).json(new ApiResponse(200, "Log inserted successfully", {log,time_elapsed,primes_count,strategy,start,end}));

    } catch (error) {
        next(error);
    }
}

const getAllLogsHandler = async (_,res,next) => {
    try {
        const logs = await getAllLogs();
        return res.status(200).json(new ApiResponse(200, "All logs retrieved successfully", logs));
    } catch (error) {
        next(error);
    }
}

const getLogsByUserIdHandler = async (req,res,next) => {
    try {
        const user = req?.user; // Assuming auth middleware adds user info to req
        if (!user) {
            return next(new ApiError(401, "Unauthorized"));
        }
        // TODO : Check user can request his logs only

        // Retrieve logs for the authenticated user
        const logs = await getLogsByUserId(user.id); 

        // return response
        return res.status(200).json(new ApiResponse(200, "User logs retrieved successfully", logs));
    } catch (error) {
        next(error);
    }
}

// getall strategies
const getAllStrategiesHandler = async (_,res,next) => {
    try {
        const strategies = await getAllStrategies();
        return res.status(200).json(new ApiResponse(200, "Strategies retrieved successfully", strategies));   
    } catch (error) {
        next(error);
    }
}

export { addLogHandler, getAllLogsHandler, getLogsByUserIdHandler, getAllStrategiesHandler };