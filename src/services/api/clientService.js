export const getAllClients = async () => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "email" } },
        { field: { Name: "company" } },
        { field: { Name: "status" } },
        { field: { Name: "created_at" } }
      ]
    };
    
    const response = await apperClient.fetchRecords("client", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    throw new Error(`Failed to fetch clients: ${error.message}`);
  }
};

export const getClientById = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "email" } },
        { field: { Name: "company" } },
        { field: { Name: "status" } },
        { field: { Name: "created_at" } }
      ]
    };
    
    const response = await apperClient.getRecordById("client", parseInt(id), params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch client: ${error.message}`);
  }
};

export const createClient = async (clientData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      records: [{
        Name: clientData.name,
        email: clientData.email,
        company: clientData.company,
        status: clientData.status || "active"
      }]
    };
    
    const response = await apperClient.createRecord("client", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success);
      const failedRecords = response.results.filter(result => !result.success);
      
      if (failedRecords.length > 0) {
        console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        throw new Error(failedRecords[0].message || "Failed to create client");
      }
      
      return successfulRecords[0].data;
    }
  } catch (error) {
    throw new Error(`Failed to create client: ${error.message}`);
  }
};

export const updateClient = async (id, clientData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      records: [{
        Id: parseInt(id),
        Name: clientData.name,
        email: clientData.email,
        company: clientData.company,
        status: clientData.status
      }]
    };
    
    const response = await apperClient.updateRecord("client", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        throw new Error(failedUpdates[0].message || "Failed to update client");
      }
      
      return successfulUpdates[0].data;
    }
  } catch (error) {
    throw new Error(`Failed to update client: ${error.message}`);
  }
};

export const deleteClient = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      RecordIds: [parseInt(id)]
    };
    
    const response = await apperClient.deleteRecord("client", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    return true;
  } catch (error) {
    throw new Error(`Failed to delete client: ${error.message}`);
  }
};