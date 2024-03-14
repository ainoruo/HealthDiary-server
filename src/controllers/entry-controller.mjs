import {customError} from '../middlewares/error-handler.mjs';
import {
  listAllEntries,
  findEntryById,
  addEntry,
  deleteEntryById,
  updateEntryById,
  listAllEntriesByUserId,
  listAllExerciseEntriesByUserId,
  addExerciseEntry,
  listHrvMeasurementsByUserId,
  addHrvmeasurement,
  listMedicationsByUser,
  postMedication,
  deleteExerciseById,
  deleteMedicationById,
  deleteHrvById,
  updateMedicationById,
  updateExerciseById,
  listNutritionByUserId,
  postNutrition,
  updateNutritionById,
  deleteNutritionById,
  updateHrvById
} from '../models/entry-model.mjs';

const getEntries = async (req, res, next) => {
  const result = await listAllEntriesByUserId(req.user.user_id);
  if (!result.error) {
    res.json(result);
  } else {
    next(new Error(result.error));
  }
};

const getEntryById = async (req, res, next) => {
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    next(customError('Entry not found', 404));
  }
};

const postEntry = async (req, res, next) => {
  const userId = req.user.user_id;
  const result = await addEntry(req.body, userId);
  if (result.entry_id) {
    res.status(201);
    res.json({message: 'New entry added.', ...result});
  } else {
    next(new Error(result.error));
  }
};

const putEntry = async (req, res, next) => {
  const entryId = req.params.id;
  const userId = req.user.user_id;
  const result = await updateEntryById(entryId, userId, req.body);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.status(201).json(result);
};

const deleteEntry = async (req, res, next) => {
  const result = await deleteEntryById(req.params.id, req.user.user_id);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.json(result);
};

const deleteNutrition = async (req, res, next) => {
  const result = await deleteNutritionById(req.params.id);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.json(result);
};


const deleteExercise = async (req, res, next) => {
  const result = await deleteExerciseById(req.params.id);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.json(result);
};

const deleteMedication = async (req, res, next) => {
  const result = await deleteMedicationById(req.params.id);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.json(result);
};

const deleteHrv = async (req, res ,next) => {
  const result = await deleteHrvById(req.params.id);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.json(result);
};

const getMedicationsByUser = async (req, res) => {
  const userId = req.user.user_id;
  const result = await listMedicationsByUser(userId);
  if (result) {
    res.json(result);
  } else {
    next(customError('Entry not found', 404));
  }
};

const postMedicationByUser = async (req, res) => {
  const {user_id, name, dosage, frequency, start_date, end_date} = req.body;
  try {
    const result = await postMedication({
      user_id,
      name,
      dosage,
      frequency,
      start_date,
      end_date
    });
    return res.status(201).json(result);
  } catch (error) {
    console.error('error:', error);
    return res.status(500).json({error: 'Database error'});
  }
};

const postNutritionByUser = async (req, res) => {
  const {user_id, entry_date, calories_consumed, protein_grams, carbohydrates_grams, fat_grams, notes} = req.body;
  try {
    const result = await postNutrition({
      user_id,
      entry_date,
      calories_consumed,
      protein_grams,
      carbohydrates_grams,
      fat_grams,
      notes
    });
    return res.status(201).json(result);
  } catch (error) {
    console.error('error:', error);
    return res.status(500).json({error: 'Database error'});
  }
};

const putMedication = async (req, res,) => {
  const medication_id = req.params.id;
  const {name, dosage, frequency, start_date, end_date} = req.body;
  if ((name || dosage || frequency || start_date || end_date) && medication_id) {
    const result = await updateMedicationById({medication_id, ...req.body});
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(201).json(result);
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }
};

const putNutrition = async (req, res, next) => {
  const nutrition_id = req.params.id;
  const userId = req.user.user_id;
  const result = await updateNutritionById(nutrition_id, userId, req.body);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.status(201).json(result);
};

const getNutritionByUser = async (req, res) => {
  const userId = req.user.user_id;
  try {
    const entries = await listNutritionByUserId(userId);
    return res.json(entries);
  } catch (error) {
    console.error('getNutritionByUser error:', error);
    return res.status(500).json({error: 'Database error'});
  }
};

const getExerciseEntriesByUser = async (req, res) => {
  const userId = req.user.user_id;

  try {
    const entries = await listAllExerciseEntriesByUserId(userId);
    return res.json(entries);
  } catch (error) {
    console.error('getExerciseEntriesByUser error:', error);
    return res.status(500).json({error: 'Database error'});
  }
};

const getHrvMeasurementsByUser = async (req, res) => {
  const userId = req.user.user_id;

  try {
    const entries = await listHrvMeasurementsByUserId(userId);
    return res.json(entries);
  } catch (error) {
    console.error('error:', error);
    return res.status(500).json({error: 'Database error'});
  }
};

const putExercise = async (req, res, next) => {
  const exercise_id = req.params.id;
  const userId = req.user.user_id;
  const result = await updateExerciseById(exercise_id, userId, req.body);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.status(201).json(result);
};

const postExerciseEntry = async (req, res) => {
  const {user_id, date, type, duration, intensity} = req.body;
  try {
    const result = await addExerciseEntry({
      user_id,
      date,
      type,
      duration,
      intensity,
    });
    return res.status(201).json(result);
  } catch (error) {
    console.error('postExerciseEntry error:', error);
    return res.status(500).json({error: 'Database error'});
  }
};

const postHrvDataByUser = async (req, res) => {
  const {user_id, measurement_date, time_of_day, hrv_value, notes} = req.body;

  try {
    const result = await addHrvmeasurement({
      user_id,
      measurement_date,
      time_of_day,
      hrv_value,
      notes,
    });
    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Database error'});
  }
};

const putHrv = async (req, res, next) => {
  const hrv_id = req.params.id;
  const userId = req.user.user_id
  const result = await updateHrvById(hrv_id, userId, req.body);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.status(201).json(result);
};

export {
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
  putHrv
};
