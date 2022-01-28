type StatementType = {
  Action: string;
  Effect: 'Allow' | 'Deny';
  Resource: string;
}

type PolicyDocumentType = {
  Version: string;
  Statement: StatementType[],
}

export type AuthResponseType = {
  principalId?: string;
  policyDocument?: PolicyDocumentType;
}
