using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace EdgePulse.Application.Common.Authorization
{
    public static class PermissionProvider
    {
        public static IEnumerable<string> GetAll()
        {
            var nestedTypes = typeof(Permissions).GetNestedTypes();

            foreach (var nestedType in nestedTypes)
            {
                var fields = nestedType.GetFields(BindingFlags.Public | BindingFlags.Static);

                foreach (var field in fields)
                {
                    if (field.GetValue(null) is string value)
                        yield return value;
                }
            }
        }
    }
}
