import { remediationFor } from './policy.js'
import type { ProjectPulseReport, RemediationPlan } from './types.js'
export function createRemediationPlan(report:ProjectPulseReport, now=new Date()):RemediationPlan {
 if(report.schemaVersion!=='1.0') throw new Error('Unsupported ProjectPulse schema version')
 if(!report.repository.trim()) throw new Error('Repository identifier is required')
 const actions=report.health.components.map(remediationFor).filter((x):x is NonNullable<typeof x>=>Boolean(x))
 return {repository:report.repository,sourceSchemaVersion:'1.0',sourceScore:report.health.score,generatedAt:now.toISOString(),actions,directMainWrites:false}
}
