// Fund Management Service
class FundService {
  constructor() {
    this.baseURL = "http://localhost:3000"; // Will use proxy
  }

  // Get authentication token from localStorage
  getAuthToken() {
    return localStorage.getItem("authToken") || null;
  }

  // Create headers with authentication
  createHeaders() {
    const token = this.getAuthToken();
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  // Add funds to user account
  async addFunds(fundData) {
    try {
      const response = await fetch("/payment-service/api/v1/funds/add", {
        method: "POST",
        headers: this.createHeaders(),
        body: JSON.stringify({
          amount: parseFloat(fundData.amount),
          paymentType: "cash", // Always cash as requested
          transactionType: "deposit",
          userId: fundData.userId,
          description: fundData.description || "Fund deposit",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: "Failed to add funds",
        }));
        throw new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Add funds error:", error);
      throw error;
    }
  }

  // Withdraw funds from user account
  async withdrawFunds(fundData) {
    try {
      const response = await fetch("/payment-service/api/v1/funds/withdraw", {
        method: "POST",
        headers: this.createHeaders(),
        body: JSON.stringify({
          amount: parseFloat(fundData.amount),
          paymentType: "cash",
          transactionType: "withdrawal",
          userId: fundData.userId,
          description: fundData.description || "Fund withdrawal",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: "Failed to withdraw funds",
        }));
        throw new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Withdraw funds error:", error);
      throw error;
    }
  }

  // Get user fund balance
  async getFundBalance(userId) {
    try {
      const response = await fetch(
        `/payment-service/api/v1/funds/balance/${userId}`,
        {
          method: "GET",
          headers: this.createHeaders(),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: "Failed to get balance",
        }));
        throw new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Get balance error:", error);
      throw error;
    }
  }

  // Get fund transaction history
  async getFundTransactions(userId, limit = 10) {
    try {
      const response = await fetch(
        `/payment-service/api/v1/funds/transactions/${userId}?limit=${limit}`,
        {
          method: "GET",
          headers: this.createHeaders(),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: "Failed to get transactions",
        }));
        throw new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Get transactions error:", error);
      throw error;
    }
  }
}

// Export singleton instance
const fundService = new FundService();
export default fundService;
