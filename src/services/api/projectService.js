export const getAllProjects = async () => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "status" } },
        { field: { Name: "budget" } },
        { field: { Name: "start_date" } },
        { field: { Name: "end_date" } },
        { field: { Name: "client_id" } }
      ]
    };
    
    const response = await apperClient.fetchRecords("project", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
};

export const getProjectById = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "status" } },
        { field: { Name: "budget" } },
        { field: { Name: "start_date" } },
        { field: { Name: "end_date" } },
        { field: { Name: "client_id" } }
      ]
    };
    
    const response = await apperClient.getRecordById("project", parseInt(id), params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch project: ${error.message}`);
  }
};

export const createProject = async (projectData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      records: [{
        Name: projectData.name,
        status: projectData.status || "planning",
        budget: projectData.budget ? parseFloat(projectData.budget) : null,
        start_date: projectData.startDate || null,
        end_date: projectData.endDate || null,
        client_id: projectData.clientId ? parseInt(projectData.clientId) : null
      }]
    };
    
    const response = await apperClient.createRecord("project", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success);
      const failedRecords = response.results.filter(result => !result.success);
      
      if (failedRecords.length > 0) {
        console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        throw new Error(failedRecords[0].message || "Failed to create project");
      }
      
      return successfulRecords[0].data;
    }
  } catch (error) {
    throw new Error(`Failed to create project: ${error.message}`);
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      records: [{
        Id: parseInt(id),
        Name: projectData.name,
        status: projectData.status,
        budget: projectData.budget ? parseFloat(projectData.budget) : null,
        start_date: projectData.startDate || null,
        end_date: projectData.endDate || null,
        client_id: projectData.clientId ? parseInt(projectData.clientId) : null
      }]
    };
    
    const response = await apperClient.updateRecord("project", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        throw new Error(failedUpdates[0].message || "Failed to update project");
      }
      
      return successfulUpdates[0].data;
    }
  } catch (error) {
    throw new Error(`Failed to update project: ${error.message}`);
  }
};

export const deleteProject = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      RecordIds: [parseInt(id)]
    };
    
    const response = await apperClient.deleteRecord("project", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    return true;
  } catch (error) {
    throw new Error(`Failed to delete project: ${error.message}`);
  }
};