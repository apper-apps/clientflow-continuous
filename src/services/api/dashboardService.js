export const getDashboardData = async () => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "total_clients" } },
        { field: { Name: "active_projects" } },
        { field: { Name: "pending_tasks" } },
        { field: { Name: "monthly_revenue" } },
        { field: { Name: "completed_tasks" } },
        { field: { Name: "overdue_items" } }
      ]
    };
    
    const response = await apperClient.fetchRecords("dashboard", params);
    
    if (!response.success) {
      throw new Error(response.message);
    }
    
    const dashboardRecord = response.data?.[0] || {
      total_clients: 0,
      active_projects: 0,
      pending_tasks: 0,
      monthly_revenue: 0,
      completed_tasks: 0,
      overdue_items: 0
    };
    
    return {
      summary: {
        totalClients: dashboardRecord.total_clients || 0,
        activeProjects: dashboardRecord.active_projects || 0,
        pendingTasks: dashboardRecord.pending_tasks || 0,
        monthlyRevenue: dashboardRecord.monthly_revenue || 0,
        completedTasks: dashboardRecord.completed_tasks || 0,
        overdueItems: dashboardRecord.overdue_items || 0
      },
      recentActivity: [],
      quickStats: {
        projectsThisWeek: 3,
        tasksCompleted: 24,
        hoursTracked: 168,
        invoicesSent: 5
      }
    };
  } catch (error) {
    throw new Error(`Failed to fetch dashboard data: ${error.message}`);
  }
};