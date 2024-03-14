import express from 'express';
import {body, param} from 'express-validator';
import {
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
  deleteEntry,
  getExerciseEntriesByUser,
  postExerciseEntry,
  getHrvMeasurementsByUser,
  postHrvDataByUser,
  getMedicationsByUser,
  postMedicationByUser,
  deleteExercise,
  deleteMedication,
  deleteHrv,
  putMedication,
  putExercise,
  getNutritionByUser,
  postNutritionByUser,
  putNutrition,
  deleteNutrition,
  putHrv,
} from '../controllers/entry-controller.mjs';
import {validationErrorHandler} from '../middlewares/error-handler.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';

const entryRouter = express.Router();

entryRouter.route('/diaries/:id').get(authenticateToken, getEntries);

entryRouter
  .route('/medications/:id')
  .get(authenticateToken, getMedicationsByUser)
  .post(authenticateToken, postMedicationByUser)
  .put(authenticateToken, putMedication)
  .delete(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    deleteMedication
  );

entryRouter
  .route('/:id')
  .post(
    authenticateToken,
    body('entry_date').isDate(),
    body('mood').optional().trim().isLength({min: 3, max: 20}).isString(),
    body('weight').optional().isFloat({min: 30, max: 200}),
    body('sleep_hours').optional().isInt({min: 0, max: 24}),
    body('notes').optional().isString().isLength({min: 3, max: 300}),
    validationErrorHandler,
    postEntry
  )
  .get(authenticateToken, getEntryById)
  .put(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    // user_id is not allowed to be changed
    body('user_id', 'not allowed').not().exists(),
    body('entry_date').optional().isDate(),
    body('mood').optional().trim().isLength({min: 3, max: 20}).isString(),
    body('weight').optional().isFloat({min: 30, max: 200}),
    body('sleep_hours').optional().isInt({min: 0, max: 24}),
    body('notes').optional().isString().isLength({min: 3, max: 300}),
    validationErrorHandler,
    putEntry
  )
  .delete(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    deleteEntry
  );

entryRouter
  .route('/exercise/:id')
  .get(authenticateToken, getExerciseEntriesByUser)
  .put(authenticateToken, putExercise)
  .post(authenticateToken, postExerciseEntry)
  .delete(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    deleteExercise
  );

entryRouter
  .route('/hrv/:id')
  .get(authenticateToken, getHrvMeasurementsByUser)
  .put(authenticateToken, putHrv)
  .post(authenticateToken, postHrvDataByUser)
  .delete(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    deleteHrv
  );

entryRouter
  .route('/nutrition/:id')
  .get(authenticateToken, getNutritionByUser)
  .post(authenticateToken, postNutritionByUser)
  .put(authenticateToken, putNutrition)
  .delete(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    deleteNutrition
  );

export default entryRouter;
