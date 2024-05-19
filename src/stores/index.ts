import { useMasterPos } from "./modules/master/master-pos/master-pos-store";
import { useMasterSpec } from "./modules/master/master-data-spec/master-data-spec-store";
import { useOptionStore } from "./modules/option/option-store";
import { useMasterInspector } from "./modules/master/master-inspector/master-inspector-store";
import { useMasterInspectionJob } from "./modules/master/master-inspection-job/master-inspection-job-store";
import { useMasterDefect } from "./modules/master/master-defect/master-defect-store";
import { useVehicleInspection } from "./modules/master/vehicle-insppection/vehicle-inspection.store";
import { useAuthStore } from "./modules/auth/auth-store";

// MASTER DATA
export const MasterPosStore = useMasterPos();
export const MasterSpecStore = useMasterSpec();
export const MasterInspectorStore = useMasterInspector();
export const MasterInspectionJobStore = useMasterInspectionJob();
export const MasterDefectStore = useMasterDefect();

// VEHICLE INSPETION
export const VehicleInspectionStore = useVehicleInspection();

// OPTION SELECT DATA
export const OptionStore = useOptionStore();

// AUTH 
export const AuthStore = useAuthStore();

export default { MasterPosStore, MasterSpecStore, OptionStore, MasterInspectorStore, MasterInspectionJobStore, MasterDefectStore, AuthStore };