namespace EdgePulse.Application.Common.Authorization
{
    public static class Permissions
    {
        public static class Dashboard
        {
            public const string View = "Dashboard.View";
        }

        public static class Customers
        {
            public const string View = "Customer.View";
            public const string Create = "Customer.Create";
            public const string Update = "Customer.Update";
            public const string Delete = "Customer.Delete";
        }

        public static class Users
        {
            public const string View = "User.View";
            public const string Create = "User.Create";
            public const string Update = "User.Update";
            public const string Delete = "User.Delete";
            public const string Assign = "User.Assign";
        }

        public static class Roles
        {
            public const string View = "Role.View";
            public const string Create = "Role.Create";
            public const string Update = "Role.Update";
            public const string Delete = "Role.Delete";
        }

        public static class Devices
        {
            public const string View = "Device.View";
            public const string Create = "Device.Create";
            public const string Update = "Device.Update";
            public const string Delete = "Device.Delete";
        }

        public static class Gateways
        {
            public const string View = "Gateway.View";
            public const string Create = "Gateway.Create";
            public const string Update = "Gateway.Update";
            public const string Delete = "Gateway.Delete";
        }
    }
}