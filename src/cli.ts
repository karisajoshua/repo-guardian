#!/usr/bin/env node
import { readFile } from 'node:fs/promises'
import { createRemediationPlan } from './planner.js'
import { createExecutionProposal } from './executor.js'
import type { ProjectPulseReport } from './types.js'

const args=process.argv.slice(2)
const value=(flag:string)=>{const i=args.indexOf(flag);return i>=0?args[i+1]:undefined}
const reportPath=value('--report')
if(!reportPath){console.error('Usage: repo-guardian --report <project-pulse.json> [--base main]');process.exit(2)}
const report=JSON.parse(await readFile(reportPath,'utf8')) as ProjectPulseReport
const plan=createRemediationPlan(report)
const proposal=createExecutionProposal(plan,value('--base')??'main')
process.stdout.write(JSON.stringify({plan,proposal},null,2)+'\n')
