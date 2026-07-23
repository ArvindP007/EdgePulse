namespace EdgePulse.Application.Common.Results;

public class Result<T> : Result
{
    public T? Value { get; }

    private Result(
        bool isSuccess,
        T? value,
        string message)
        : base(isSuccess, message)
    {
        Value = value;
    }

    public static Result<T> Success(
        T value,
        string message = "")
    {
        return new(true, value, message);
    }

    public new static Result<T> Failure(
        string message)
    {
        return new(false, default, message);
    }
}