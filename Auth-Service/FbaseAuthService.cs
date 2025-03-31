using System.Security.Claims;

namespace BlazorDBApp.Auth_Service;

public class FbaseAuthService
{
    public event Action<ClaimsPrincipal>? UserChanged;
    private ClaimsPrincipal? _currentUser;

    public ClaimsPrincipal CurrentUser
    {
        get => _currentUser ?? new ClaimsPrincipal();
        set
        {
            _currentUser = value;
            UserChanged?.Invoke(_currentUser);
        }
    }

    private UserInfo? CurrentUserInfo { get; set; }
    public bool IsAuthenticated => CurrentUserInfo is not null;
    public event Action? OnAuthStateChanged;

    public void SetUser(UserInfo user)
    {
        CurrentUserInfo = user;
        OnAuthStateChanged?.Invoke();
    }
}