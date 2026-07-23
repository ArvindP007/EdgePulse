using System;
using System.Collections.Generic;
using System.Text;

namespace EdgePulse.Application.Common.Authorization
{
    public static class Permissions
    {
        public static class Dashboard
        {
            public const string View = "Dashboard.View";
        }

        public static class Customer
        {
            public const string Read = "Customer.Read";
            public const string Create = "Customer.Create";
            public const string Update = "Customer.Update";
            public const string Delete = "Customer.Delete";
        }

        public static class User
        {
            public const string Read = "User.Read";
            public const string Create = "User.Create";
            public const string Update = "User.Update";
            public const string Delete = "User.Delete";
        }

        public static class Role
        {
            public const string Read = "Role.Read";
            public const string Create = "Role.Create";
            public const string Update = "Role.Update";
            public const string Delete = "Role.Delete";
        }

        public static class Device
        {
            public const string Read = "Device.Read";
            public const string Create = "Device.Create";
            public const string Update = "Device.Update";
            public const string Delete = "Device.Delete";
        }

        public static class Gateway
        {
            public const string Read = "Gateway.Read";
            public const string Create = "Gateway.Create";
            public const string Update = "Gateway.Update";
            public const string Delete = "Gateway.Delete";
        }
    }
}
