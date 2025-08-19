export type BookingAction = 
  | 'view'
  | 'edit'
  | 'cancel'
  | 'confirm'
  | 'reject'
  | 'check-in'
  | 'check-out'
  | 'payment'
  | 'invoice'
  | 'email'
  | 'duplicate';

export interface BookingActionConfig {
  action: BookingAction;
  label: string;
  icon: string;
  color: string;
  requiresConfirmation?: boolean;
  allowedStatuses?: string[];
}