import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer, updateCustomer } from "../services/customerService";
import type { CreateCustomerRequest, Customer } from "../types";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

interface CustomerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    customer?:Customer | null;
}

export default function CustomerDialog({
    open,
    onOpenChange,
    customer,
}: CustomerDialogProps) {

    const isEdit = !!customer;
    
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<CreateCustomerRequest>();

    useEffect(() =>{
        if(customer){
            reset({
                name:customer.name,
                code:customer.code,
                contactPerson: customer.contactPerson,
                email:customer.email,
                phoneNumber:customer.phoneNumber,
                address:customer.address,
            });
        }
        else{
           reset({
                name:"",
                code:"",
                contactPerson: "",
                email: "",
                phoneNumber: "",
                address: "",
            }); 
        }
    },[customer,reset]);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: CreateCustomerRequest) =>{
            if(customer){
                await updateCustomer(customer.id, data);
                return;
            }
            return createCustomer(data);
        },

        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["customers"],
            });
            reset();
            onOpenChange(false);
        },       
    });

    const onSubmit = async (data: CreateCustomerRequest) => {
        await mutation.mutateAsync(data);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-lg">

                <DialogHeader>
                    <DialogTitle>
                        {isEdit? "Edit Customer": "Add Customer"}
                    </DialogTitle>
                </DialogHeader>

                <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Customer Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Acme Technologies"
                                    {...register("name")}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="code">Customer Code</Label>
                                <Input
                                    id="code"
                                    placeholder="ACM001"
                                    {...register("code")}
                                />
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="contact@acme.com"
                                {...register("email")}
                            />
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="contactPerson">Contact Person</Label>
                                <Input
                                    id="contactPerson"
                                    placeholder="John Smith"
                                    {...register("contactPerson")}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                <Input
                                    id="phoneNumber"
                                    placeholder="+91 9876543210"
                                    {...register("phoneNumber")}
                                />
                            </div>
                        </div>

                        {/* Row 4 */}
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                placeholder="Customer address"
                                {...register("address")}
                            />
                        </div>

                        <DialogFooter className="pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending ? "Saving..." : isEdit ? "Update Customer": "Save Customer"}
                            </Button>
                        </DialogFooter>
                    </form>

            </DialogContent>
        </Dialog>
    );
}