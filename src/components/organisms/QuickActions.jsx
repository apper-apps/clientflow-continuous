import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import ProjectModal from "@/components/molecules/ProjectModal";
import ClientModal from "@/components/molecules/ClientModal";
import InvoiceModal from "@/components/molecules/InvoiceModal";
import { createInvoice } from "@/services/api/invoiceService";

const QuickActions = () => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const handleProjectSubmit = async (projectData) => {
    // Modal handles the submission and toast notifications
    setIsProjectModalOpen(false);
  };

  const handleClientCreated = (newClient) => {
    // Modal handles success notifications
    setIsClientModalOpen(false);
  };

  const handleInvoiceSubmit = async (invoiceData) => {
    try {
      await createInvoice(invoiceData);
      setIsInvoiceModalOpen(false);
      toast.success("Invoice created successfully!");
    } catch (error) {
      toast.error("Failed to create invoice. Please try again.");
      throw error;
    }
  };
  const handleActionClick = (actionTitle) => {
    switch (actionTitle) {
      case "New Project":
        setIsProjectModalOpen(true);
        break;
      case "Add Client":
        setIsClientModalOpen(true);
        break;
      case "Create Invoice":
        setIsInvoiceModalOpen(true);
        break;
      case "Time Tracker":
        // Navigate to time tracking page or show time tracker modal
        console.log("Time Tracker clicked - functionality to be implemented");
        break;
      default:
        break;
    }
  };

  const actions = [
    {
      title: "New Project",
      description: "Start a new client project",
      icon: "FolderPlus",
      color: "from-blue-500 to-blue-600",
      delay: 0
    },
    {
      title: "Add Client",
      description: "Add a new client to your roster",
      icon: "UserPlus",
      color: "from-green-500 to-green-600",
      delay: 0.1
    },
    {
      title: "Create Invoice",
      description: "Generate a new invoice",
      icon: "FileText",
      color: "from-purple-500 to-purple-600",
      delay: 0.2
    },
    {
      title: "Time Tracker",
      description: "Track time for current tasks",
      icon: "Clock",
      color: "from-orange-500 to-orange-600",
      delay: 0.3
    }
  ];

  return (
    <Card className="h-full">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Quick Actions
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Common tasks and shortcuts
        </p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: action.delay }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
<button 
                className="w-full p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 text-left group"
                onClick={() => handleActionClick(action.title)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200`}>
                    <ApperIcon name={action.icon} size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {action.title}
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {action.description}
                </p>
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" className="w-full">
            <ApperIcon name="Settings" size={16} className="mr-2" />
            Customize Actions
          </Button>
</div>
      </div>
      
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSubmit={handleProjectSubmit}
      />
      
      <ClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onClientCreated={handleClientCreated}
      />
      
      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        onSubmit={handleInvoiceSubmit}
      />
    </Card>
  );
};

export default QuickActions;