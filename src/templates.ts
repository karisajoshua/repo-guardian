import type { RemediationAction } from './types.js'
export interface FilePatch { path:string; content:string; controlId:string }
export function renderPatch(action:RemediationAction):FilePatch|undefined {
 if(action.risk==='high'||action.kind==='manual-review'||!action.targetPath) return undefined
 const templates:Record<string,string>={
  'docs/readme':'# Repository\n\nTODO: Document purpose, setup, usage, testing and maintenance ownership.\n',
  'security/policy':'# Security Policy\n\nPlease report suspected vulnerabilities privately to the repository maintainers. Do not disclose sensitive vulnerability details in public issues.\n',
  'community/contributing':'# Contributing\n\nUse a focused branch, keep changes scoped, add or update tests where appropriate, and open a pull request describing what changed and how it was validated.\n',
  'automation/ci':"name: CI\non:\n  push:\n  pull_request:\npermissions:\n  contents: read\njobs:\n  validation-required:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: echo 'RepoGuardian created this safe CI scaffold. Replace this step with repository-specific validation before merge.'\n"
 }
 const content=templates[action.controlId]; return content?{path:action.targetPath,content,controlId:action.controlId}:undefined
}
