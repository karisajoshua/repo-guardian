export type RiskLevel = 'low' | 'medium' | 'high'
export type ActionKind = 'add-file' | 'add-workflow' | 'manual-review'

export interface PulseComponent { id:string; label:string; points:number; maxPoints:number; explanation:string }
export interface ProjectPulseReport { schemaVersion:'1.0'; repository:string; generatedAt:string; health:{score:number; level:string; components:readonly PulseComponent[]} }
export interface RemediationAction { controlId:string; title:string; kind:ActionKind; risk:RiskLevel; targetPath?:string; rationale:string; requiresHumanApproval:true }
export interface RemediationPlan { repository:string; sourceSchemaVersion:'1.0'; sourceScore:number; generatedAt:string; actions:readonly RemediationAction[]; directMainWrites:false }
