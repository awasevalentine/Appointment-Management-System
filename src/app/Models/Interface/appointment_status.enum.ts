export enum AppointmentStatus {
    RUNNING = 'running',
    CANCEL = 'cancel',
    COMPLETED = 'completed'
}

export interface StatusType{
    running: string;
    cancelled: string;
    completed: string;
}

export interface CountResponse{
    runningCount: number;
    cancelledCount: number;
    completedCount: number;
}