using System.ComponentModel.DataAnnotations;

namespace BlazorDBApp.Auth_Service;

public class UserInfo
{
    public required string Uid { get; set; }
    public required string Email { get; set; }
    public required string DisplayName { get; set; }
    public required string PhotoUrl { get; set; } = "";
}