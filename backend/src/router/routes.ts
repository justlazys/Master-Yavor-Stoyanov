import { Router } from 'express'
import { registerController } from '../controller/register';
import { loginController } from '../controller/login';
import { retrieveController } from '../controller/retrieve';
import { editUserController } from '../controller/edit-user';
import { nomController } from '../controller/nomenclature';
import { editDisciplinesController } from '../controller/disciplines';
import { retrieveLogs } from '../controller/logs';
import { massageController } from '../controller/massages';
import { textMassages } from '../controller/text-messages';

export const router = Router();

router.post(
  '/create_account',
  registerController.create,
);



router.post(
  '/check_number',
  registerController.checkLastNumber,
);

router.post(
  '/login',
  loginController.loginUser,
);

router.post(
  '/login_email',
  loginController.loginWithEmail,
);

router.post(
  '/login_teacher',
  loginController.loginTeacher,
);

router.post(
  '/retrieve_student',
  retrieveController.retrieveStudent,
);

router.post(
  '/get_student',
  retrieveController.getStudent,
);

router.post(
  '/get_edit_users',
  editUserController.retrieveProfile,
);

router.post(
  '/update_user',
  editUserController.updateProfile,
);
router.post(
  '/update_health_care',
  editUserController.updateHealthCare,
);

router.post(
  '/remove_health_care',
  editUserController.removeHealthCare,
);

router.post(
  '/update_sport',
  editUserController.updateSport,
);

router.post(
  '/remove_sport',
  editUserController.removeSport,
);
router.post(
  '/update_scholarship',
  editUserController.updateScholarship,
);

router.post(
  '/remove_scholarship',
  editUserController.removeScholarship,
);

router.post(
  '/update_dorm',
  editUserController.updateDorm,
);

router.post(
  '/remove_dorm',
  editUserController.removeDorm,
);
router.post(
  '/update_grade',
  editUserController.updateGrade,
);

router.post(
  '/remove_grade',
  editUserController.removeGrade,
);
router.post(
  '/edit_grade',
  editUserController.editUser,
);

router.post(
  '/nom_disc',
  nomController.loadDisc,
);
router.post(
  '/get_edit_teacher',
  editUserController.retrieveTeacher,
);
router.post(
  '/retrieve_edit_teacher',
  editUserController.getTeacher,
);
router.post(
  '/update_edit_teacher',
  editUserController.updateTeacher,
);
router.post(
  '/retrieve_teacher_list',
  editUserController.listTeacher,
);

router.post(
  '/retrieve_teacher_from_id',
  retrieveController.getTeacher,
);
router.post(
  '/add_discipline', 
  editDisciplinesController.create,
);
router.post(
  '/retrieve_all_discipline',
  editDisciplinesController.retrieveAll,
);
router.post(
  '/retrieve_discipline_by_id',
  editDisciplinesController.retrieveById,
);
router.post(
  '/updated_discipline',
  editDisciplinesController.updateDisciplines,
);
router.post(
  '/delete_discipline',
  editDisciplinesController.deleteDisciplines,
);
router.post(
  '/filter_discipline',
  editDisciplinesController.filterDisciplines,
);
router.post(
  '/load_logs',
  retrieveLogs.retrieveLogs,
);
router.post(
  '/load_messages',
  massageController.retrieveMassages,
);

router.post(
  '/send_email',
  massageController.sendEmail,
);

router.post(
  '/send_msg',
  textMassages.sendMassage,
);
router.post(
  '/retrieve_msg',
  textMassages.retrieveAllMsg,
);