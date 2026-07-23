namespace EdgePulse.Application.Common.Results;

public class Result
{
    public bool IsSuccess { get; }

    public string Message { get; }

    protected Result(bool isSuccess, string message)
    {
        IsSuccess = isSuccess;
        Message = message;
    }

    public static Result Success(string message = "")
        => new(true, message);

    public static Result Failure(string message)
        => new(false, message);
}