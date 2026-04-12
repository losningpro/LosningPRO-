import type { PublicIntent } from "./access-control";
import { setAuthIntent } from "./access-control";

export function markViewerIntent(): void {
  setAuthIntent("viewer");
}

export function markLeadIntent(): void {
  setAuthIntent("lead");
}

export function markWorkerCandidateIntent(): void {
  setAuthIntent("worker_candidate");
}

export function markCustomerIntent(): void {
  setAuthIntent("kunde");
}
