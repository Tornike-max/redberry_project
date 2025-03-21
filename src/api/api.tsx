import axios from 'axios';
import { CreateWorkerInterface } from '../types/types';

export const getDepartments = async () => {
    try {
      const token = "9e79e6e0-5874-4b41-b84e-6b8793e5d6c4";
  
      if (!token) {
        throw new Error("Authorization token is missing");
      }
  
      const response = await axios.get(
        `https://momentum.redberryinternship.ge/api/departments`
      );
  
      if (response.status !== 200) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
  
      if (!response.data) {
        throw new Error("No data received from the server");
      }
  
      return response.data;
    } catch (error) {
      if (error) {
        console.error(`Server responded with status `);
      }
  
      throw new Error("Failed to fetch real estates");
    }
  };

  export const getPriorities= async () => {
    try {
      const token = "9e79e6e0-5874-4b41-b84e-6b8793e5d6c4";
  
      if (!token) {
        throw new Error("Authorization token is missing");
      }
  
      const response = await axios.get(
        `https://momentum.redberryinternship.ge/api/priorities`
      );
  
      if (response.status !== 200) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
  
      if (!response.data) {
        throw new Error("No data received from the server");
      }
  
      return response.data;
    } catch (error) {
      if (error) {
        console.error(`Server responded with status `);
      }
  
      throw new Error("Failed to fetch real estates");
    }
  };

  export const getWorkers= async () => {
    try {
      const token = "9e79e6e0-5874-4b41-b84e-6b8793e5d6c4";
  
      if (!token) {
        throw new Error("Authorization token is missing");
      }
  
      const response = await axios.get(
        `https://momentum.redberryinternship.ge/api/employees`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status !== 200) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
  
      if (!response.data) {
        throw new Error("No data received from the server");
      }
  
      return response.data;
    } catch (error) {
      if (error) {
        console.error(`Server responded with status `);
      }
  
      throw new Error("Failed to fetch real estates");
    }
  };


  export const createWorker = async (data: CreateWorkerInterface) => {
    try {
      const token = "9e79e6e0-5874-4b41-b84e-6b8793e5d6c4";
  
      if (!token) {
        throw new Error("Authorization token is missing");
      }
      console.log(data)
  
      const response = await axios.post(
        `https://momentum.redberryinternship.ge/api/employees`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status < 200 || response.status >= 300) {
        throw new Error(
          `Failed to store real estate. Unexpected response status: ${response.status}`
        );
      }
  
      if (!response.data) {
        throw new Error("Failed to store real estate");
      }
  
      return response.data;
    } catch (error) {
      console.error(`Error: ${error || "Failed to store real estate"}`);
      throw new Error("Failed to store real estate");
    }
  };
  