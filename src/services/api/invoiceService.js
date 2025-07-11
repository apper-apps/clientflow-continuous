export const getAllInvoices = async () => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "amount" } },
        { field: { Name: "status" } },
        { field: { Name: "due_date" } },
        { field: { Name: "payment_date" } },
        { field: { Name: "client_id" } },
        { field: { Name: "project_id" } }
      ]
    };
    
    const response = await apperClient.fetchRecords("app_invoice", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    throw new Error(`Failed to fetch invoices: ${error.message}`);
  }
};

export const getInvoiceById = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "amount" } },
        { field: { Name: "status" } },
        { field: { Name: "due_date" } },
        { field: { Name: "payment_date" } },
        { field: { Name: "client_id" } },
        { field: { Name: "project_id" } }
      ]
    };
    
    const response = await apperClient.getRecordById("app_invoice", parseInt(id), params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch invoice: ${error.message}`);
  }
};

export const createInvoice = async (invoiceData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
const params = {
      records: [{
        Name: `Invoice-${Date.now()}`,
        amount: parseFloat(invoiceData.amount),
        status: invoiceData.status || "draft",
        due_date: invoiceData.due_date,
        payment_date: invoiceData.payment_date || null,
        client_id: invoiceData.client_id ? parseInt(invoiceData.client_id) : null,
        project_id: invoiceData.project_id ? parseInt(invoiceData.project_id) : null
      }]
    };
    
    const response = await apperClient.createRecord("app_invoice", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success);
      const failedRecords = response.results.filter(result => !result.success);
      
      if (failedRecords.length > 0) {
        console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        throw new Error(failedRecords[0].message || "Failed to create invoice");
      }
      
      return successfulRecords[0].data;
    }
  } catch (error) {
    throw new Error(`Failed to create invoice: ${error.message}`);
  }
};

export const updateInvoice = async (id, invoiceData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
const params = {
      records: [{
        Id: parseInt(id),
        amount: invoiceData.amount ? parseFloat(invoiceData.amount) : undefined,
        status: invoiceData.status,
        due_date: invoiceData.due_date,
        payment_date: invoiceData.payment_date || null,
        client_id: invoiceData.client_id ? parseInt(invoiceData.client_id) : undefined,
        project_id: invoiceData.project_id ? parseInt(invoiceData.project_id) : undefined
      }]
    };
    
    const response = await apperClient.updateRecord("app_invoice", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        throw new Error(failedUpdates[0].message || "Failed to update invoice");
      }
      
      return successfulUpdates[0].data;
    }
  } catch (error) {
    throw new Error(`Failed to update invoice: ${error.message}`);
  }
};

export const markInvoiceAsSent = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      records: [{
        Id: parseInt(id),
        status: "sent"
      }]
    };
    
    const response = await apperClient.updateRecord("app_invoice", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        throw new Error(failedUpdates[0].message || "Failed to mark invoice as sent");
      }
      
      return successfulUpdates[0].data;
    }
  } catch (error) {
    throw new Error(`Failed to mark invoice as sent: ${error.message}`);
  }
};

export const markInvoiceAsPaid = async (id, paymentDate) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      records: [{
        Id: parseInt(id),
        status: "paid",
        payment_date: paymentDate ? new Date(paymentDate).toISOString() : null
      }]
    };
    
    const response = await apperClient.updateRecord("app_invoice", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        throw new Error(failedUpdates[0].message || "Failed to mark invoice as paid");
      }
      
      return successfulUpdates[0].data;
    }
  } catch (error) {
    throw new Error(`Failed to mark invoice as paid: ${error.message}`);
  }
};

export const deleteInvoice = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      RecordIds: [parseInt(id)]
    };
    
    const response = await apperClient.deleteRecord("app_invoice", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    return true;
  } catch (error) {
    throw new Error(`Failed to delete invoice: ${error.message}`);
  }
};