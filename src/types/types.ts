export interface FilterInterface {
    department: string;
    priority: string;
    worker: string;
  }

export interface CreateWorkerInterface {
    name: string;
    surname: string;
    avatar?: File | null;
    email: string;
    phone: number;
}


export interface CreateWorkerInterface {
    name: string;
    surname: string;
    avatar?: File | null;
    department_id: number;
}

