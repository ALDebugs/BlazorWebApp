using System.Security.Claims;
using Microsoft.AspNetCore.Components.Authorization;

namespace BlazorDBApp.Auth_Service;

public class FbaseAuthStateProvider : AuthenticationStateProvider
{
    private ClaimsPrincipal CurrentUser { get; set; } = new(new ClaimsIdentity());

    public override Task<AuthenticationState> GetAuthenticationStateAsync()
    {
        return Task.FromResult(new AuthenticationState(CurrentUser));
    }

    public void UpdateAuthState(UserInfo user)
    {
        if (user is null || user.Email == "")
        {
            CurrentUser = new ClaimsPrincipal(new ClaimsIdentity());
        }
        else
        {
            var identity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Uid),
                new Claim(ClaimTypes.Email, user.Email ?? ""),
                new Claim(ClaimTypes.Name, user.DisplayName ?? ""),
                new Claim("PhotoUrl", user.PhotoUrl ?? "")
            }, "Firebase");
            
            CurrentUser = new ClaimsPrincipal(identity);
        }
        NotifyAuthenticationStateChanged(Task.FromResult(new AuthenticationState(CurrentUser)));
    }
}