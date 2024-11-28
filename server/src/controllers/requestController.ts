import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createRequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // console.log("this is the body",req.body)
    const { description, roomNo, wing } = req.body;
    // console.log(req.user);
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized. User not authenticated.",
      });
      return;
    }
    //  console.log("printing req.body",req.body);
    const request = await prisma.request.create({
      data: {
        description,
        roomNumber : roomNo,
        wing,
        studentId: req.user.id, // Assuming you have studentId from the auth middleware
      },
    });
    //console.log("print request which i have get after printing above two statements",request);
     
     res.status(201).json({
      success: true,
      message: "Request created successfully.",
      data: request,
    });
    return ;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      success: false,
      message: "Failed to create request.",
      error: errorMessage,
    });
    return ;
  }
};

// logic to see all requests by admin
export const getAllRequestsHandler = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
       res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return ;
    }
    const { role, id } = req.user; // Extract user role and ID from the authenticated user

    // Pagination (default values: page = 1, limit = 10)
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const statusFilter = req.query.status as string; // Optional filter by status

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Base query
    let whereClause: any = {};

    if (role === 'user') {
      // Students can only view their own requests
      whereClause.studentId = id;
    }

    if (statusFilter) {
      // Add status filter if provided
      whereClause.status = statusFilter;
    }

    // Fetch requests with pagination
    const requests = await prisma.request.findMany({
      where: whereClause,
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' }, // Sort by creation date (newest first)
    });

    // Count total requests for pagination metadata
    const totalRequests = await prisma.request.count({ where: whereClause });

     res.status(200).json({
      success: true,
      data: {
        requests,
        pagination: {
          totalRequests,
          currentPage: page,
          totalPages: Math.ceil(totalRequests / limit),
        },
      },
    });
    return ;
  } catch (error) {
    console.error('Error fetching requests:', error);
     res.status(500).json({
      success: false,
      message: 'Failed to fetch requests.',
    });
    return ;
  }
};

// updating the status of request 
export const updateRequestStatusHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // ID of the request to update
    const { status } = req.body; // New status value

    // Validate status
    const validStatuses = ["pending", "in-progress", "resolved"];
    if (!validStatuses.includes(status)) {
       res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values are: ${validStatuses.join(", ")}`,
      });
      return ;
    }

    // Find the request in the database
    const existingRequest = await prisma.request.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingRequest) {
       res.status(404).json({
        success: false,
        message: "Request not found",
      });
      return ;
    }

    // Check if the user is authorized to update the status
    if (req.user?.role !== "admin" && existingRequest.studentId !== req.user?.id) {
       res.status(403).json({
        success: false,
        message: "You are not authorized to update the status of this request",
      });
      return ;
    }

    // Update the status
    const updatedRequest = await prisma.request.update({
      where: { id: parseInt(id) },
      data: {
        status,
      },
    });

    res.status(200).json({
      success: true,
      message: "Request status updated successfully",
      data: updatedRequest,
    });
    return;
  } catch (error) {
    console.error(error);
     res.status(500).json({
      success: false,
      message: "Failed to update the request status",
    });
    return ;
  }
};
// export const updateRequestStatusHandler = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params; // ID of the request to update
//     const { status } = req.body; // New status value

//     // Validate status
//     const validStatuses = ["pending", "in-progress", "resolved"];
//     if (!validStatuses.includes(status)) {
//        res.status(400).json({
//         success: false,
//         message: `Invalid status. Allowed values are: ${validStatuses.join(", ")}`,
//       });
//       return ;
//     }

//     // Find the request in the database
//     const existingRequest = await prisma.request.findUnique({
//       where: { id: parseInt(id) },
//     });

//     if (!existingRequest) {
//        res.status(404).json({
//         success: false,
//         message: "Request not found",
//       });
//       return ;
//     }

//     // Check if the user is authorized to update the status
//     if (req.user?.role !== "admin" && existingRequest.studentId !== req.user?.id) {
//        res.status(403).json({
//         success: false,
//         message: "You are not authorized to update the status of this request",
//       });
//       return ;
//     }

//     // Update the status
//     const updatedRequest = await prisma.request.update({
//       where: { id: parseInt(id) },
//       data: {
//         status,
//       },
//     });

//     res.status(200).json({
//       success: true,
//       message: "Request status updated successfully",
//       data: updatedRequest,
//     });
//     return;
//   } catch (error) {
//     console.error(error);
//      res.status(500).json({
//       success: false,
//       message: "Failed to update the request status",
//     });
//     return ;
//   }
// };


//delete a request
export const deleteRequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Extract request ID from the route params

    // Check if the request exists
    const existingRequest = await prisma.request.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingRequest) {
       res.status(404).json({
        success: false,
        message: "Request not found",
      });
      return ;
    }

    // Authorization: Only the admin or the student who created it can delete
    if (req.user?.role !== "admin" && existingRequest.studentId !== req.user?.id) {
       res.status(403).json({
        success: false,
        message: "You are not authorized to delete this request",
      });
      return;
    }

    // Delete the request
    await prisma.request.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      success: true,
      message: "Request deleted successfully",
    });
    return;
  } catch (error) {
    console.error(error);
     res.status(500).json({
      success: false,
      message: "Failed to delete the request",
    });
    return ;
  }
};

