package com.learning.utils;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.learning.entity.Role;

@SuppressWarnings("serial")
public class RoleSerializer extends StdSerializer<Set<Role>> {

	public RoleSerializer() {
		this(null);
	}

	protected RoleSerializer(Class<Set<Role>> t) {
		super(t);
	}

	@Override
	public void serialize(Set<Role> value, JsonGenerator gen, SerializerProvider provider) throws IOException {
		List<String> roles = value.stream().map(role -> role.getRoleName().toString()).collect(Collectors.toList());
		gen.writeObject(roles);
	}

}
