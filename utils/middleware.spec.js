const middleware = require("./middleware");

describe("Auth middleware", () => {
  let mockRequest;
  let mockResponse;
  let nextFunction;

  beforeEach(() => {
    mockRequest = {
      isAuthenticated: jest.fn().mockReturnValue(true),
      flash: jest.fn(),
    };
    mockResponse = {
      redirect: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  it("Should call next function if authenticated", () => {
    middleware.isLoggedIn(mockRequest, mockResponse, nextFunction);
    expect(nextFunction).toHaveBeenCalledTimes(1);
  });

  it("Should redirect if not authenticated", () => {
    mockRequest.isAuthenticated = jest.fn().mockReturnValue(false);
    middleware.isLoggedIn(mockRequest, mockResponse, nextFunction);
    expect(nextFunction).toHaveBeenCalledTimes(0);
    expect(mockResponse.redirect).toHaveBeenCalledTimes(1);
    expect(mockResponse.redirect).toHaveBeenCalledWith("/mealapp/login");
  });
});
