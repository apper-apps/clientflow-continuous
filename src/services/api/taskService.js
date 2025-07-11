import { getAllProjects } from './projectService';

export const getAllTasks = async () => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "title" } },
        { field: { Name: "priority" } },
        { field: { Name: "status" } },
        { field: { Name: "due_date" } },
        { field: { Name: "total_time" } },
        { field: { Name: "active_timer" } },
        { field: { Name: "project_id" } }
      ]
    };
    
    const response = await apperClient.fetchRecords("task", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }
};

export const getTaskById = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "title" } },
        { field: { Name: "priority" } },
        { field: { Name: "status" } },
        { field: { Name: "due_date" } },
        { field: { Name: "total_time" } },
        { field: { Name: "active_timer" } },
        { field: { Name: "project_id" } }
      ]
    };
    
    const response = await apperClient.getRecordById("task", parseInt(id), params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch task: ${error.message}`);
  }
};

export const createTask = async (taskData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      records: [{
        Name: taskData.name,
        title: taskData.title,
        priority: taskData.priority || "medium",
        status: taskData.status || "todo",
        due_date: taskData.due_date || null,
        total_time: taskData.total_time || 0,
        active_timer: taskData.active_timer || null,
        project_id: taskData.project_id ? parseInt(taskData.project_id) : null
      }]
    };
    
    const response = await apperClient.createRecord("task", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success);
      const failedRecords = response.results.filter(result => !result.success);
      
      if (failedRecords.length > 0) {
        console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        throw new Error(failedRecords[0].message || "Failed to create task");
      }
      
      return successfulRecords[0].data;
    }
  } catch (error) {
    throw new Error(`Failed to create task: ${error.message}`);
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      records: [{
        Id: parseInt(id),
        Name: taskData.name,
        title: taskData.title,
        priority: taskData.priority,
        status: taskData.status,
        due_date: taskData.due_date,
        total_time: taskData.total_time,
        active_timer: taskData.active_timer,
        project_id: taskData.project_id ? parseInt(taskData.project_id) : null
      }]
    };
    
    const response = await apperClient.updateRecord("task", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        throw new Error(failedUpdates[0].message || "Failed to update task");
      }
      
      return successfulUpdates[0].data;
    }
  } catch (error) {
    throw new Error(`Failed to update task: ${error.message}`);
  }
};

export const updateTaskStatus = async (id, status) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      records: [{
        Id: parseInt(id),
        status: status
      }]
    };
    
    const response = await apperClient.updateRecord("task", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        throw new Error(failedUpdates[0].message || "Failed to update task status");
      }
      
      return successfulUpdates[0].data;
    }
  } catch (error) {
    throw new Error(`Failed to update task status: ${error.message}`);
  }
};

export const deleteTask = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      RecordIds: [parseInt(id)]
    };
    
    const response = await apperClient.deleteRecord("task", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    return true;
  } catch (error) {
    throw new Error(`Failed to delete task: ${error.message}`);
  }
};

export const startTaskTimer = async (id) => {
  // Mock implementation - would integrate with time tracking service
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const now = new Date().toISOString();
  
  return {
    Id: parseInt(id),
    startTime: now
  };
};

export const stopTaskTimer = async (id) => {
  // Mock implementation - would integrate with time tracking service
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const now = new Date().toISOString();
  const duration = 1800000; // Mock 30 minutes
  
  return {
    Id: Date.now(),
    startTime: new Date(Date.now() - duration).toISOString(),
    endTime: now,
    duration: duration,
    date: new Date().toISOString().split('T')[0]
  };
};

export const getTaskTimeLogs = async (id) => {
  // Mock implementation - would fetch from time tracking records
  await new Promise(resolve => setTimeout(resolve, 150));
  return [];
};